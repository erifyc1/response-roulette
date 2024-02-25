use anchor_lang::prelude::*;

use crate::constants::MAX_WOOD_PER_TREE;

#[account]
pub struct GameData {
    pub votes: [u64; 10],
    pub prompt_idx: u8, 
    pub responses: [String; 10], // we only have three computers for testing purposes
    pub responses_idx: u8, 
    pub game_idx: u8, 
    pub votes_one: u8, 
    pub votes_two: u8, 
    pub winner: u8,
    pub idx_one: u8, 
    pub idx_two: u8
}

impl GameData {
    pub fn set_response(&mut self, response: String) -> Result<()> {
        self.game_idx = 1;
        if (self.game_idx == 1) {
            self.responses[self.responses_idx as usize] = response;
            self.responses_idx += 1;
            if (self.responses_idx == 5) {
                self.responses_idx = 0;
                self.game_idx = 2;
                self.idx_one = (self.idx_one + 1) % 5;
                self.idx_two = (self.idx_one + 1) % 5;
                self.votes_one = 0;
                self.votes_two = 0;
            }
        } else if (self.game_idx == 0) {
            self.prompt_idx = (self.prompt_idx + 1 ) % 10;
            self.game_idx = 1;
        }
        Ok(())
    }
    pub fn check_init(&mut self) -> Result<()> {
        if (self.game_idx == 0 || self.game_idx == 3) {
            self.game_idx = 1;
        }
        self.prompt_idx = (self.prompt_idx + 1 ) % 10;
        self.game_idx = 1;
        Ok(())
    }
    pub fn cast_vote(&mut self, vote: u8) {
        self.game_idx = 2;
        if (vote == 0) {
            self.votes_one += 1;
        } else if (vote == 1){
            self.votes_two += 1; 
        }
        if (self.votes_two + self.votes_one == 5) {
            self.game_idx = 3; 
            if (self.votes_two > self.votes_one) {
                self.winner = 1;
            } else {
                self.winner = 0;
            }
            self.votes_two = 0;
            self.votes_one = 0;
        }
    }
    pub fn on_tree_chopped(&mut self, amount_chopped: u64, tree_idx: u64) -> Result<()> {
        Ok(())
    }

}
