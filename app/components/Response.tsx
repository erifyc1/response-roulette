import Image from "next/image"
import { useCallback, useState } from "react"
import { Button, HStack, VStack } from "@chakra-ui/react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useSessionWallet } from "@magicblock-labs/gum-react-sdk"
import { useGameState } from "@/contexts/GameStateProvider"
import { GAME_DATA_SEED, gameDataPDA, program } from "@/utils/anchor"
import { BN } from "@coral-xyz/anchor"
import { Text, Input } from "@chakra-ui/react"


const InputResponse = () => {
  const { publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()
  const sessionWallet = useSessionWallet()
  const { gameState, playerDataPDA, responses } = useGameState()
  const [isLoadingSession, setIsLoadingSession] = useState(false)
  const [isLoadingMainWallet, setIsLoadingMainWallet] = useState(false)
  const [transactionCounter, setTransactionCounter] = useState(0)
  const [response, setResponse] = useState('');
  var input_value = "";
  const handleChange = (() => {
    // do nothing
  }) 
  const onInputClick = useCallback(async () => {
    setIsLoadingSession(true)
    if (!playerDataPDA || !sessionWallet) return
    setTransactionCounter(transactionCounter + 1);

    try {
      const transaction = await program.methods
        .submitResponse(GAME_DATA_SEED, response)
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
          <Text> The Prompt is: </Text>
          <Input
            type="text"
            value={response}
            onChange={e => setResponse(e.target.value)}
         />
          <HStack>
            {sessionWallet && sessionWallet.sessionToken != null && (
              <Button
                isLoading={isLoadingSession}
                onClick={onInputClick}
                width="175px"
              >
                Submit
              </Button>
            )}
          </HStack>
          <Text> Response Zero: {responses[0]} </Text>
        </VStack>
      )}
    </>
  )
}

export default InputResponse
