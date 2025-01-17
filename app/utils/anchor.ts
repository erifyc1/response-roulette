import { Program, IdlAccounts, BN } from "@coral-xyz/anchor"
import { Lumberjack, IDL } from "../idl/lumberjack"
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js"
import { WrappedConnection } from "./wrappedConnection";

export const CONNECTION = new WrappedConnection(process.env.NEXT_PUBLIC_RPC ? process.env.NEXT_PUBLIC_RPC : 'https://rpc.magicblock.app/devnet',  {
  wsEndpoint: process.env.NEXT_PUBLIC_WSS_RPC ? process.env.NEXT_PUBLIC_WSS_RPC : "wss://rpc.magicblock.app/devnet",
  commitment: 'confirmed' 
});

export const METAPLEX_READAPI = "https://devnet.helius-rpc.com/?api-key=78065db3-87fb-431c-8d43-fcd190212125";

// Here you can basically use what ever seed you want. For example one per level or city or whatever.
export const GAME_DATA_SEED = "level_2";

// Lumberjack game program ID
const programId = new PublicKey("6XvmJxX7JpaLpJwJ7qPGoXPyb2Jz3RiBMf9Go2DpWw2G")

// Create the program interface using the idl, program ID, and provider
export const program = new Program<Lumberjack>(IDL, programId, {
  connection: CONNECTION,
})

export const [gameDataPDA] = PublicKey.findProgramAddressSync(
  [Buffer.from(GAME_DATA_SEED, "utf8")],
  program.programId
)

// Player Data Account Type from Idl
export type PlayerData = IdlAccounts<Lumberjack>["playerData"]
export type GameData = IdlAccounts<Lumberjack>["gameData"]

// Constants for the game
export const TIME_TO_REFILL_ENERGY: BN = new BN(60)
export const MAX_ENERGY = 100
export const ENERGY_PER_TICK: BN = new BN(1)
export const VOTES_A: BN = new BN(0)
export const VOTES_B: BN = new BN(0)
