import Image from "next/image"
import { HStack, VStack, Text, Spacer } from "@chakra-ui/react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useGameState } from "@/contexts/GameStateProvider"

const DisplayPlayerData = () => {
  const { publicKey } = useWallet()
  const { gameState, nextEnergyIn, votes } = useGameState()

  return (
    <>
      {gameState && publicKey && (
        <HStack justifyContent="center" spacing={4}>
          <VStack>
            <HStack>
              {/* <Image src="/Wood.png" alt="Wood Icon" width={64} height={64} /> */}
              {/* <Text>Wood: {Number(gameState.wood)}</Text> */}
              {/* <Image src="/energy.png" alt="Energy Icon" width={64} height={64} /> */}
              {/* <VStack>
                <Text>Energy: {Number(gameState.energy)}</Text>
                <Text>Next in: {nextEnergyIn}</Text>
              </VStack> */}
            </HStack>
            <HStack>
            <Text>Votes for A: {Number(votes![0])}</Text>
            <Spacer />
            <Text>Votes for B: {Number(votes![1])}</Text>
            </HStack>
          </VStack>
        </HStack>
      )}
    </>
  )
}

export default DisplayPlayerData
