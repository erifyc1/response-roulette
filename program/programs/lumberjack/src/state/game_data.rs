use anchor_lang::prelude::*;

use crate::constants::MAX_WOOD_PER_TREE;

#[account]
pub struct GameData {
    pub votes: [u64; 10],
    pub prompt_idx: u8
}

impl GameData {
    pub fn on_tree_chopped(&mut self, amount_chopped: u64, tree_idx: u64) -> Result<()> {
        match self.votes[tree_idx as usize].checked_add(amount_chopped) {
            Some(v) => {
                if self.votes[tree_idx as usize] >= MAX_WOOD_PER_TREE {
                    self.votes[tree_idx as usize] = 0;
                    msg!("Tree successfully chopped. New Tree coming up.");
                } else {
                    self.votes[tree_idx as usize] = v;
                    msg!("Total wood chopped: {}", v);
                }
            }
            None => {
                msg!("The ever tree is completly chopped!");
            }
        };

        Ok(())
    }

    pub fn increment_prompt_idx(&mut self) -> Result<()> {
        self.prompt_idx += 1;
        Ok(())
    }
}
