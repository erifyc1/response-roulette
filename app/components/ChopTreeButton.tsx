import Image from "next/image"
import { useCallback, useState } from "react"
import { Button, HStack, VStack, Text } from "@chakra-ui/react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useSessionWallet } from "@magicblock-labs/gum-react-sdk"
import { useGameState } from "@/contexts/GameStateProvider"
import { GAME_DATA_SEED, gameDataPDA, program } from "@/utils/anchor"
import { BN } from "@coral-xyz/anchor"

export interface UserProps {
  vote_idx: BN
}

const ChopTreeButton = ({vote_idx} : UserProps) => {
  const { publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()
  const sessionWallet = useSessionWallet()
  const { gameState, playerDataPDA, votes, votesOne, votesTwo, responses, idxOne, idxTwo } = useGameState()
  const [isLoadingSession, setIsLoadingSession] = useState(false)
  const [isLoadingMainWallet, setIsLoadingMainWallet] = useState(false)
  const [transactionCounter, setTransactionCounter] = useState(0)
  
  const onChopClick = useCallback(async () => {
    setIsLoadingSession(true)
    if (!playerDataPDA || !sessionWallet) return
    setTransactionCounter(transactionCounter + 1);

    try {
      const transaction = await program.methods
        .castVote(GAME_DATA_SEED, vote_idx)
        .accounts({
          player: playerDataPDA,
          gameData: gameDataPDA,
          signer: sessionWallet.publicKey!,
          sessionToken: sessionWallet.sessionToken,
        })
        .transaction()

      const txids = await sessionWallet.signAndSendTransaction!(transaction)

      if (txids && txids.length > 0) {
        console.log("Transaction sent:", txids)
      } else {
        console.error("Failed to send transaction")
      }
    } catch (error: any) {
      console.log("error", `Chopping failed! ${error?.message}`)
    } finally {
      setIsLoadingSession(false)
    }
  }, [sessionWallet])

  

  return (
    <>
      {publicKey && gameState && (
        <VStack>
          {Number(vote_idx)}
          {/* <Image src="/Beaver.png" alt="" width={16} height={16} /> */}
          <VStack>
            <Text> {Number(vote_idx) == 0 ? responses[idxOne] : responses[idxTwo]} </Text>
            <HStack>
              {Number(vote_idx) == 0 && sessionWallet && sessionWallet.sessionToken != null && (
                <Button
                isLoading={isLoadingSession}
                onClick={onChopClick}
                width="4em"
                height="2.5em"
                fontSize="9xl"
                backgroundColor="indianred"
                >
                {Number(vote_idx) == 0 ? 'A' : 'B'}
                </Button>
              )}
              {Number(vote_idx) == 1 && sessionWallet && sessionWallet.sessionToken != null && (
                <Button
                isLoading={isLoadingSession}
                onClick={onChopClick}
                width="4em"
                height="2.5em"
                fontSize="9xl"
                backgroundColor="deepskyblue"
                >
                {Number(vote_idx) == 0 ? 'A' : 'B'}
                </Button>
              )}

            </HStack>
            <Text fontSize="larger"> {Number(vote_idx) == 0 ? votesOne : votesTwo} Votes</Text>
          </VStack>
        </VStack>
      )}
    </>
  )
}

export default ChopTreeButton
