export type Lumberjack = {
  "version": "0.1.0",
  "name": "lumberjack",
  "instructions": [
    {
      "name": "initPlayer",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gameData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "levelSeed",
          "type": "string"
        }
      ]
    },
    {
      "name": "chopTree",
      "accounts": [
        {
          "name": "sessionToken",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gameData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "levelSeed",
          "type": "string"
        },
        {
          "name": "counter",
          "type": "u16"
        }
      ]
    },
    {
      "name": "createElection",
      "accounts": [
        {
          "name": "electionData",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "winners",
          "type": "u8"
        }
      ]
    },
    {
      "name": "apply",
      "accounts": [
        {
          "name": "candidateIdentity",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "electionData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "register",
      "accounts": [
        {
          "name": "candidateData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "electionData",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "candidateIdentity",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "changeStage",
      "accounts": [
        {
          "name": "electionData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "newStage",
          "type": {
            "defined": "ElectionStage"
          }
        }
      ]
    },
    {
      "name": "vote",
      "accounts": [
        {
          "name": "myVote",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "candidateData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "electionData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "gameData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalWoodCollected",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "playerData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "level",
            "type": "u8"
          },
          {
            "name": "xp",
            "type": "u64"
          },
          {
            "name": "wood",
            "type": "u64"
          },
          {
            "name": "energy",
            "type": "u64"
          },
          {
            "name": "lastLogin",
            "type": "i64"
          },
          {
            "name": "lastId",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "ElectionData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "candidates",
            "type": "u64"
          },
          {
            "name": "stage",
            "type": {
              "defined": "ElectionStage"
            }
          },
          {
            "name": "initiator",
            "type": "publicKey"
          },
          {
            "name": "winnersNum",
            "type": "u8"
          },
          {
            "name": "winnersId",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "winnersVotes",
            "type": {
              "vec": "u64"
            }
          }
        ]
      }
    },
    {
      "name": "CandidateData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "votes",
            "type": "u64"
          },
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "pubkey",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "CandidateIdentity",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "pubkey",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "MyVote",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "ElectionStage",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Application"
          },
          {
            "name": "Voting"
          },
          {
            "name": "Closed"
          }
        ]
      }
    },
    {
      "name": "ElectionError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "WinnerCountNotAllowed"
          },
          {
            "name": "ApplicationIsClosed"
          },
          {
            "name": "WrongPublicKey"
          },
          {
            "name": "PrivilegeNotAllowed"
          },
          {
            "name": "ElectionIsClosed"
          },
          {
            "name": "NotAtVotingStage"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NotEnoughEnergy",
      "msg": "Not enough energy"
    },
    {
      "code": 6001,
      "name": "WrongAuthority",
      "msg": "Wrong Authority"
    }
  ],
  "metadata": {
    "address": "4jcLhzcFDwdbHv613w51tr8b8wymmfG11jmZkSKrZugS"
  }
};

export const IDL: Lumberjack = {
  "version": "0.1.0",
  "name": "lumberjack",
  "instructions": [
    {
      "name": "initPlayer",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gameData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "levelSeed",
          "type": "string"
        }
      ]
    },
    {
      "name": "chopTree",
      "accounts": [
        {
          "name": "sessionToken",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gameData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "levelSeed",
          "type": "string"
        },
        {
          "name": "counter",
          "type": "u16"
        }
      ]
    },
    {
      "name": "createElection",
      "accounts": [
        {
          "name": "electionData",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "winners",
          "type": "u8"
        }
      ]
    },
    {
      "name": "apply",
      "accounts": [
        {
          "name": "candidateIdentity",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "electionData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "register",
      "accounts": [
        {
          "name": "candidateData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "electionData",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "candidateIdentity",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "changeStage",
      "accounts": [
        {
          "name": "electionData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "newStage",
          "type": {
            "defined": "ElectionStage"
          }
        }
      ]
    },
    {
      "name": "vote",
      "accounts": [
        {
          "name": "myVote",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "candidateData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "electionData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "gameData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalWoodCollected",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "playerData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "level",
            "type": "u8"
          },
          {
            "name": "xp",
            "type": "u64"
          },
          {
            "name": "wood",
            "type": "u64"
          },
          {
            "name": "energy",
            "type": "u64"
          },
          {
            "name": "lastLogin",
            "type": "i64"
          },
          {
            "name": "lastId",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "ElectionData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "candidates",
            "type": "u64"
          },
          {
            "name": "stage",
            "type": {
              "defined": "ElectionStage"
            }
          },
          {
            "name": "initiator",
            "type": "publicKey"
          },
          {
            "name": "winnersNum",
            "type": "u8"
          },
          {
            "name": "winnersId",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "winnersVotes",
            "type": {
              "vec": "u64"
            }
          }
        ]
      }
    },
    {
      "name": "CandidateData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "votes",
            "type": "u64"
          },
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "pubkey",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "CandidateIdentity",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "pubkey",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "MyVote",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "ElectionStage",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Application"
          },
          {
            "name": "Voting"
          },
          {
            "name": "Closed"
          }
        ]
      }
    },
    {
      "name": "ElectionError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "WinnerCountNotAllowed"
          },
          {
            "name": "ApplicationIsClosed"
          },
          {
            "name": "WrongPublicKey"
          },
          {
            "name": "PrivilegeNotAllowed"
          },
          {
            "name": "ElectionIsClosed"
          },
          {
            "name": "NotAtVotingStage"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NotEnoughEnergy",
      "msg": "Not enough energy"
    },
    {
      "code": 6001,
      "name": "WrongAuthority",
      "msg": "Wrong Authority"
    }
  ],
  "metadata": {
    "address": "4jcLhzcFDwdbHv613w51tr8b8wymmfG11jmZkSKrZugS"
  }
};