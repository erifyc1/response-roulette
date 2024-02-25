import { createContext, useContext, useEffect, useState } from "react"
import { PublicKey } from "@solana/web3.js"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import {
  program,
  PlayerData,
  MAX_ENERGY,
  TIME_TO_REFILL_ENERGY,
  GameData,
  GAME_DATA_SEED,
} from "@/utils/anchor"
import { BN } from "@coral-xyz/anchor"

const GameStateContext = createContext<{
  playerDataPDA: PublicKey | null  
  gameState: PlayerData | null
  nextEnergyIn: number
  votes: BN[] | null
  promptIdx: number,
  responses: String[],
  responsesIdx: number,
  gameIdx: number,
  votesOne: number, 
  votesTwo: number, 
  winner: number,
  idxOne: number,
  idxTwo: number
}>({
  playerDataPDA: null,
  gameState: null,
  nextEnergyIn: 0,
  votes: [new BN(0),new BN(0),new BN(0),new BN(0),new BN(0),new BN(0),new BN(0),new BN(0),new BN(0),new BN(0)],
  promptIdx: 0, 
  responses: ["", "", "", "", "", "", "", "", "", ""],
  responsesIdx: 0,
  gameIdx: 0, 
  votesOne: 0, 
  votesTwo: 0,
  winner: 0,
  idxOne: 0,
  idxTwo: 0
})

export const useGameState = () => useContext(GameStateContext)

export const GameStateProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { publicKey } = useWallet()
  const { connection } = useConnection()

  const [playerDataPDA, setPlayerData] = useState<PublicKey | null>(null)
  const [playerState, setPlayerState] = useState<PlayerData | null>(null)
  const [timePassed, setTimePassed] = useState<any>([])
  const [nextEnergyIn, setEnergyNextIn] = useState<number>(0)
  const [gameDataPDA, setGameDataPDA] = useState<PublicKey | null>(null)
  const [gameData, setGameData] = useState<GameData | null>(null)
  const [votes, setVotes] = useState<BN[] | null>([new BN(0),new BN(0),new BN(0),new BN(0),new BN(0),new BN(0),new BN(0),new BN(0),new BN(0),new BN(0)])
  const [promptIdx, setPromptIdx] = useState<number>(0);
  const [responses, setResponses] = useState<String[]>(["", "", "", "", "", "", "", "", "", ""]);
  const [responsesIdx, setResponsesIdx] = useState<number>(0);
  const [gameIdx, setGameIdx] = useState<number>(0);
  const [votesOne, setVotesOne] = useState<number>(0);
  const [votesTwo, setVotesTwo] = useState<number>(0);
  const [winner, setWinner] = useState<number>(0);
  const [idxOne, setIdxOne] = useState<number>(0);
  const [idxTwo, setIdxTwo] = useState<number>(0);
  useEffect(() => {
    setPlayerState(null)
    if (!publicKey) {
      return
    }
    const [pda] = PublicKey.findProgramAddressSync(
      [Buffer.from("player", "utf8"), publicKey.toBuffer()],
      program.programId
    )
    setPlayerData(pda)

    program.account.playerData
      .fetch(pda)
      .then((data) => {
        setPlayerState(data)
      })
      .catch((error) => {
        window.alert("No player data found, please init!")
      })

    connection.onAccountChange(pda, (account) => {
      setPlayerState(program.coder.accounts.decode("playerData", account.data))
    })
  }, [publicKey])

  useEffect(() => {
    setGameData(null)
    if (!publicKey) {
      return
    }
    const [pda] = PublicKey.findProgramAddressSync(
      [Buffer.from(GAME_DATA_SEED, "utf8")],
      program.programId
    )
    setGameDataPDA(gameDataPDA)

    program.account.gameData
      .fetch(pda)
      .then(async (data) => {
        const prev_game_data = data.gameIdx;
        setGameData(data);
        setVotes(data.votes);
        setPromptIdx(data.promptIdx);
        setResponses(data.responses);
        setResponsesIdx(data.responsesIdx);
        setGameIdx(data.gameIdx);
        setVotesOne(data.votesOne);
        setVotesTwo(data.votesTwo);
        setWinner(data.winner);
        setIdxOne(data.idxOne);
        setIdxTwo(data.idxTwo);
        /**if (data.gameIdx == 3) {
          if (data.winner == 0) {
            window.location.replace('http://localhost:3000/victor_zero');
          } else {
            window.location.replace('http://localhost:3000/victor_one');
          }
        }*/
        if (data.gameIdx == 2 && prev_game_data != 2) {
          window.location.replace('http://localhost:3000/votes');
        } else {
          console.log(data.gameIdx);
        }
      })
      .catch((error) => {
        window.alert("No game data found, please init!")
      })

    connection.onAccountChange(pda, async (account) => {
      const newGameData = program.coder.accounts.decode("gameData", account.data);
      const prev_game_data = newGameData.gameIdx;
      setGameData(newGameData);
      setVotes(newGameData.votes);
      setPromptIdx(newGameData.promptIdx);
      setResponses(newGameData.responses);
      setGameIdx(newGameData.gameIdx);
      setResponsesIdx(newGameData.responsesIdx);
      setVotesOne(newGameData.votesOne);
      setVotesTwo(newGameData.votesTwo);
      setWinner(newGameData.winner);
      setIdxOne(newGameData.idxOne);
        setIdxTwo(newGameData.idxTwo);
      /**if (newGameData.gameIdx == 3) {
        if (newGameData.winner == 0) {
          window.location.replace('http://localhost:3000/victor_zero');
        } else {
          window.location.replace('http://localhost:3000/victor_one');
        }
      }*/
      if (newGameData.gameIdx == 2 && prev_game_data != 2) {
        window.location.replace('http://localhost:3000/votes');
      } else {
        console.log(newGameData.gameIdx);
      }
    })
  }, [publicKey])


  useEffect(() => {
    const interval = setInterval(async () => {
      if (
        playerState == null ||
        playerState.lastLogin == undefined ||
        playerState.energy.toNumber() >= MAX_ENERGY
      ) {
        return;
      }
    
      const lastLoginTime = playerState.lastLogin.toNumber() * 1000;
      const currentTime = Date.now();
      let timePassed = (currentTime - lastLoginTime) / 1000;
    
      while (timePassed >= TIME_TO_REFILL_ENERGY.toNumber() && playerState.energy.toNumber() < MAX_ENERGY) {
        playerState.energy = playerState.energy.add(new BN(1));
        playerState.lastLogin = playerState.lastLogin.add(TIME_TO_REFILL_ENERGY);
        timePassed -= TIME_TO_REFILL_ENERGY.toNumber();
      }
    
      setTimePassed(timePassed);
    
      const nextEnergyIn = Math.floor(TIME_TO_REFILL_ENERGY.toNumber() - timePassed);
      setEnergyNextIn(nextEnergyIn > 0 ? nextEnergyIn : 0);
    }, 1000);

    return () => clearInterval(interval)
  }, [playerState, timePassed, nextEnergyIn])

  return (
    <GameStateContext.Provider
      value={{
        playerDataPDA,
        gameState: playerState,
        nextEnergyIn,
        votes,
        promptIdx,
        responses,
        responsesIdx,
        gameIdx, 
        votesOne,
        votesTwo,
        winner,
        idxOne, 
        idxTwo
      }}
    >
      {children}
    </GameStateContext.Provider>
  )
}
