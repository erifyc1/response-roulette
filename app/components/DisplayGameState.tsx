import Image from "next/image"
import { HStack, VStack, Text } from "@chakra-ui/react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useGameState } from "@/contexts/GameStateProvider"
import { VOTES_A, VOTES_B } from "@/utils/anchor"

const DisplayPlayerData = () => {
  const { publicKey } = useWallet()
  const { gameState, nextEnergyIn, votes } = useGameState()

  return (
    <>
      {gameState && publicKey && (
        <HStack justifyContent="center" spacing={4}>
          <HStack>
            <Image src="/Wood.png" alt="Wood Icon" width={64} height={64} />
            <Text>Wood: {Number(gameState.wood)}</Text>
          </HStack>
          <HStack>
            <Image src="/energy.png" alt="Energy Icon" width={64} height={64} />
            <VStack>
              <Text>Energy: {Number(gameState.energy)}</Text>
              <Text>Next in: {nextEnergyIn}</Text>
            </VStack>
          </HStack>
          <Text>Total Votes on A: {Number(VOTES_A)}</Text>
          <Text>Total Votes on B: {Number(VOTES_B)}</Text>
          <Text>numba 0: {Number(votes![0])}</Text>
          <Text>numba 1: {Number(votes![1])}</Text>
        </HStack>
      )}
    </>
  )
}

export default DisplayPlayerData
