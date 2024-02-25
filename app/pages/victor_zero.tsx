import { Box, Flex, Heading, Spacer, VStack, Text, HStack, Button } from "@chakra-ui/react"

import WalletMultiButton from "@/components/WalletMultiButton"
import SessionKeyButton from "@/components/SessionKeyButton"
import InitPlayerButton from "@/components/InitPlayerButton"
import RequestAirdrop from "@/components/RequestAirdrop"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useSessionWallet } from "@magicblock-labs/gum-react-sdk"
import { useGameState } from "@/contexts/GameStateProvider"
import { useState } from "react"
import { GAME_DATA_SEED, gameDataPDA, program } from "@/utils/anchor"

export default function Home() {
  const { publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()
  const sessionWallet = useSessionWallet()
  const { gameState, playerDataPDA, votes } = useGameState()
  const [isLoadingSession, setIsLoadingSession] = useState(false)
  const [isLoadingMainWallet, setIsLoadingMainWallet] = useState(false)
  const [transactionCounter, setTransactionCounter] = useState(0)
  const switch_url = (async () => {
    window.location.replace('http://localhost:3000/response');
    setTransactionCounter(transactionCounter + 1);

    try {
      const transaction = await program.methods
        .checkInit(GAME_DATA_SEED)
        .accounts({
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
  })
  return (
    <Box>

      <Flex px={4} py={4}>
        <Spacer />
        <VStack>
        <WalletMultiButton />
        <InitPlayerButton />
        <SessionKeyButton />
        <RequestAirdrop />
        </VStack>
      </Flex>
      <VStack>
      <Heading>Quote Zero Won</Heading>
      <Button onClick={switch_url}>Join New Game</Button>
      </VStack>
    </Box>
  )
}