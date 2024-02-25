import Image from "next/image"
import { useCallback, useState } from "react"
import { Button, HStack, VStack, Text } from "@chakra-ui/react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useSessionWallet } from "@magicblock-labs/gum-react-sdk"
import { useGameState } from "@/contexts/GameStateProvider"
import { gameDataPDA, program } from "@/utils/anchor"

const ChangePromptButton = () => {
  const { publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()
  const sessionWallet = useSessionWallet()
  const { gameState, playerDataPDA } = useGameState()
  const [isLoadingSession, setIsLoadingSession] = useState(false)
  const [isLoadingMainWallet, setIsLoadingMainWallet] = useState(false)
  const [transactionCounter, setTransactionCounter] = useState(0)
  
  const onChangePromptClick = useCallback(async () => {
    setIsLoadingSession(true)
    if (!playerDataPDA || !sessionWallet) return
    setTransactionCounter(transactionCounter + 1);

    try {
      const transaction = await program.methods
        .incrementPromptIdx()
        .accounts({
          player: playerDataPDA,
          gameData: gameDataPDA,
          signer: sessionWallet.publicKey!,
          sessionToken: sessionWallet.sessionToken,
        })
        .transaction()

      const txids = await sessionWallet.signAndSendTransaction!(transaction)
      // const txSig = await sendTransaction(transaction, connection, {
      //   skipPreflight: true,
      // })
      if (txids && txids.length > 0) {
        console.log("Transaction sent:", txids)
      } else {
        console.error("Failed to send transaction")
      }
    } catch (error: any) {
      console.log("error", `increment failed! ${error?.message}`)
    } finally {
      setIsLoadingSession(false)
    }
  }, [sessionWallet])

  const onChangePromptMainWalletClick = useCallback(async () => {
    if (!publicKey || !playerDataPDA) return

    setIsLoadingMainWallet(true)

    try {
      const transaction = await program.methods
        .incrementPromptIdx()
        .accounts({
          player: playerDataPDA,
          gameData: gameDataPDA,
          signer: publicKey,
          sessionToken: null,
        })
        .transaction()

      const txSig = await sendTransaction(transaction, connection, {
        skipPreflight: true,
      })
      console.log(`https://explorer.solana.com/tx/${txSig}?cluster=devnet`)
    } catch (error: any) {
      console.log("error", `increment failed! ${error?.message}`)
    } finally {
      setIsLoadingMainWallet(false)
    }
  }, [publicKey, playerDataPDA, connection])

  return (
    <>
      {publicKey && gameState && (
        <VStack>
          <VStack>
            <HStack>
              {sessionWallet && sessionWallet.sessionToken != null && (
                <Button
                isLoading={isLoadingSession}
                onClick={onChangePromptClick}
                width="3em"
                height="3em"
                fontSize="2xl"
                backgroundColor="indianred"
                >
                Bruh
                </Button>
              )}

            </HStack>
            <Text fontSize="larger">bruh</Text>
          </VStack>
        </VStack>
      )}
    </>
  )
}

export default ChangePromptButton
