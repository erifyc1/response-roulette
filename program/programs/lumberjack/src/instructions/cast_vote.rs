pub use crate::errors::GameErrorCode;
pub use crate::state::game_data::GameData;
use crate::state::player_data::PlayerData;
use anchor_lang::prelude::*;
use session_keys::{Session, SessionToken};

pub fn submit_response(mut ctx: Context<CastVote>, response: String) -> Result<()> {
    let account: &mut &mut CastVote<'_> = &mut ctx.accounts;
    account.game_data.set_response(response);
    Ok(())
}
pub fn check_init(mut ctx: Context<CastVote>) -> Result<()> {
    let account: &mut &mut CastVote<'_> = &mut ctx.accounts;
    account.game_data.check_init();
    Ok(())
}

pub fn cast_vote(mut ctx: Context<CastVote>, vote: u8) -> Result<()> {
    let account: &mut &mut CastVote<'_> = &mut ctx.accounts;
    account.game_data.cast_vote(vote);
    Ok(())
}

#[derive(Accounts, Session)]
#[instruction(level_seed: String)]
pub struct CastVote<'info> {
    #[session(
        // The ephemeral key pair signing the transaction
        signer = signer,
        // The authority of the user account which must have created the session
        authority = player.authority.key()
    )]
    // Session Tokens are passed as optional accounts
    pub session_token: Option<Account<'info, SessionToken>>,

    // There is one PlayerData account
    #[account(
        mut,
        seeds = [b"player".as_ref(), player.authority.key().as_ref()],
        bump,
    )]
    pub player: Account<'info, PlayerData>,

    // There can be multiple levels the seed for the level is passed in the instruction
    // First player starting a new level will pay for the account in the current setup
    #[account(
        init_if_needed,
        payer = signer,
        space = 1000,
        seeds = [level_seed.as_ref()],
        bump,
    )]
    pub game_data: Account<'info, GameData>,

    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}
