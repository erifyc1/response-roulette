import Image from "next/image"
import { useCallback, useState } from "react"
import { Button, HStack, VStack, Text } from "@chakra-ui/react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useSessionWallet } from "@magicblock-labs/gum-react-sdk"
import { useGameState } from "@/contexts/GameStateProvider"
import { GAME_DATA_SEED, gameDataPDA, program } from "@/utils/anchor"
import { BN } from "@coral-xyz/anchor"

export interface UserProps {
  tree_idx: BN
}

const ChopTreeButton = ({tree_idx} : UserProps) => {
  const { publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()
  const sessionWallet = useSessionWallet()
  const { gameState, playerDataPDA, votes } = useGameState()
  const [isLoadingSession, setIsLoadingSession] = useState(false)
  const [isLoadingMainWallet, setIsLoadingMainWallet] = useState(false)
  const [transactionCounter, setTransactionCounter] = useState(0)
  
  const onChopClick = useCallback(async () => {
    setIsLoadingSession(true)
    if (!playerDataPDA || !sessionWallet) return
    setTransactionCounter(transactionCounter + 1);

    try {
      const transaction = await program.methods
        .chopTree(GAME_DATA_SEED, transactionCounter, tree_idx)
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

  const onChopMainWalletClick = useCallback(async () => {
    if (!publicKey || !playerDataPDA) return

    setIsLoadingMainWallet(true)

    try {
      const transaction = await program.methods
        .chopTree(GAME_DATA_SEED, transactionCounter, tree_idx)
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
      console.log("error", `Chopping failed! ${error?.message}`)
    } finally {
      setIsLoadingMainWallet(false)
    }
  }, [publicKey, playerDataPDA, connection])

  return (
    <>
      {publicKey && gameState && (
        <VStack>
          {Number(tree_idx)}
          {/* <Image src="/Beaver.png" alt="" width={16} height={16} /> */}
          <VStack>
            <HStack>
              {Number(tree_idx) == 0 && sessionWallet && sessionWallet.sessionToken != null && (
                <Button
                isLoading={isLoadingSession}
                onClick={onChopClick}
                width="4em"
                height="2.5em"
                fontSize="9xl"
                backgroundColor="indianred"
                >
                {Number(tree_idx) == 0 ? 'A' : 'B'}
                </Button>
              )}
              {Number(tree_idx) == 1 && sessionWallet && sessionWallet.sessionToken != null && (
                <Button
                isLoading={isLoadingSession}
                onClick={onChopClick}
                width="4em"
                height="2.5em"
                fontSize="9xl"
                backgroundColor="deepskyblue"
                >
                {Number(tree_idx) == 0 ? 'A' : 'B'}
                </Button>
              )}

            </HStack>
            <Text fontSize="larger">{Number(votes![Number(tree_idx)])} Votes</Text>
          </VStack>
        </VStack>
      )}
    </>
  )
}

export default ChopTreeButton
