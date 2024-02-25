import Image from "next/image"
import { HStack, VStack, Text } from "@chakra-ui/react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useGameState } from "@/contexts/GameStateProvider"
import { TOTAL_WOOD_AVAILABLE } from "@/utils/anchor"

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
          {/* <Text>Total Wood available: {Number(TOTAL_WOOD_AVAILABLE) - Number(totalWoodAvailable)}</Text> */}
          <Text>numba 0: {Number(votes![0])}</Text>
          <Text>numba 1: {Number(votes![1])}</Text>
          <Text>numba 2: {Number(votes![2])}</Text>
          <Text>numba 3: {Number(votes![3])}</Text>
          <Text>numba 4: {Number(votes![4])}</Text>
          <Text>numba 5: {Number(votes![5])}</Text>
          <Text>numba 6: {Number(votes![6])}</Text>
          <Text>numba 7: {Number(votes![7])}</Text>
          <Text>numba 8: {Number(votes![8])}</Text>
          <Text>numba 9: {Number(votes![9])}</Text>
        </HStack>
      )}
    </>
  )
}

export default DisplayPlayerData
