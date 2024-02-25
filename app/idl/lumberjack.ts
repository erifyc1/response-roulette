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
        },
        {
          "name": "treeIdx",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "gameData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "votes",
            "type": {
              "array": [
                "u64",
                10
              ]
            }
          },
          {
            "name": "promptIdx",
            "type": "u8"
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
        },
        {
          "name": "treeIdx",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "gameData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "votes",
            "type": {
              "array": [
                "u64",
                10
              ]
            }
          },
          {
            "name": "promptIdx",
            "type": "u8"
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