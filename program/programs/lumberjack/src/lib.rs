pub use crate::errors::GameErrorCode;
pub use anchor_lang::prelude::*;
pub use session_keys::{session_auth_or, Session, SessionError};
pub mod constants;
pub mod errors;
pub mod instructions;
pub mod state;
use instructions::*;

declare_id!("6XvmJxX7JpaLpJwJ7qPGoXPyb2Jz3RiBMf9Go2DpWw2G");

#[program]
pub mod lumberjack {

    use super::*;

    pub fn init_player(ctx: Context<InitPlayer>, _level_seed: String) -> Result<()> {
        init_player::init_player(ctx)
    }

    // This function lets the player chop a tree and get 1 wood. The session_auth_or macro
    // lets the player either use their session token or their main wallet. (The counter is only
    // there so that the player can do multiple transactions in the same block. Without it multiple transactions
    // in the same block would result in the same signature and therefore fail.)
    #[session_auth_or(
        ctx.accounts.player.authority.key() == ctx.accounts.signer.key(),
        GameErrorCode::WrongAuthority
    )]
    pub fn cast_vote(ctx: Context<CastVote>, _level_seed: String, vote: u8) -> Result<()> {
        cast_vote::cast_vote(ctx, vote)
    }
    pub fn submit_response(ctx: Context<CastVote>, _level_seed: String, response: String) ->Result<()> {
        cast_vote::submit_response(ctx, response)
    }
    pub fn check_init(ctx: Context<CastVote>, _level_seed: String) -> Result<()> {
        cast_vote::check_init(ctx)
    }
    
    
}
