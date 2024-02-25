import Image from "next/image"
import { useCallback, useState } from "react"
import { Button, HStack, VStack } from "@chakra-ui/react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useSessionWallet } from "@magicblock-labs/gum-react-sdk"
import { useGameState } from "@/contexts/GameStateProvider"
import { GAME_DATA_SEED, gameDataPDA, program } from "@/utils/anchor"

const CreateElectionButton = () => {
  const { publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()
  const sessionWallet = useSessionWallet()
  const { gameState, playerDataPDA } = useGameState()
  const [isLoadingSession, setIsLoadingSession] = useState(false)
  const [isLoadingMainWallet, setIsLoadingMainWallet] = useState(false)
  const [transactionCounter, setTransactionCounter] = useState(0)

  const onElectionCreateClick = useCallback(async () => {
    setIsLoadingSession(true)
    if (!playerDataPDA || !sessionWallet) return
    setTransactionCounter(transactionCounter + 1);

    try {
      const transaction = await program.methods
        .createElection(1)
        .accounts({
          electionData: gameDataPDA,
          systemProgram: playerDataPDA,
          signer: sessionWallet.publicKey!
          // player: playerDataPDA,
          // gameData: gameDataPDA,
          // signer: sessionWallet.publicKey!,
          // sessionToken: sessionWallet.sessionToken,
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

  const onElectionMainWalletClick = useCallback(async () => {
    if (!publicKey || !playerDataPDA) return

    setIsLoadingMainWallet(true)

    try {
      const transaction = await program.methods
        .createElection(1)
        .accounts({
          electionData: gameDataPDA,
          signer: publicKey,
          systemProgram: playerDataPDA
          // player: playerDataPDA,
          // gameData: gameDataPDA,
          // signer: publicKey,
          // sessionToken: null,
        })
        .transaction()

      const txSig = await sendTransaction(transaction, connection, {
        skipPreflight: true,
      })
      console.log(`https://explorer.solana.com/tx/${txSig}?cluster=devnet`)
    } catch (error: any) {
      console.log("error", `Election failed! ${error?.message}`)
    } finally {
      setIsLoadingMainWallet(false)
    }
  }, [publicKey, playerDataPDA, connection])

  return (
    <>
      {publicKey && gameState && (
        <VStack>
          <Image src="/Wood.png" alt="Bruh" width={64} height={64} />
          <HStack>
            {sessionWallet && sessionWallet.sessionToken != null && (
              <Button
                isLoading={isLoadingSession}
                onClick={onElectionCreateClick}
                width="175px"
              >
                Chop tree Session
              </Button>
            )}
            <Button
              isLoading={isLoadingMainWallet}
              onClick={onElectionMainWalletClick}
              width="175px"
            >
              Chop tree MainWallet
            </Button>
          </HStack>
        </VStack>
      )}
    </>
  )
}

export default CreateElectionButton