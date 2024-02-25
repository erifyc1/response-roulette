import Image from "next/image"
import { HStack, VStack, Text, Spacer } from "@chakra-ui/react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useGameState } from "@/contexts/GameStateProvider"

let array = [
  "What would you do if you found a dead body in a hotel room?",
  "What\'s the toughest decision you made this year?",
  "Which one would you prefer: have no nose but have really good smelling fingers or be blind but have a really nice smile?",
  "What have you forgotten?",
  "If you were guaranteed the answer to one question, what would it be?",
  "What\'s it like being you right now?",
  "What makes you nostalgic?",
  "If you had two hours left on earth what would you do?",
  "What\'s the most beautiful word in the world?",
  "Who makes you laugh more than anyone?",
  "What are the books/movies/games that never get old and always make you feel better when you get down?",
  "What is the most trivial thing about which you have a strong opinion?",
];

const DisplayPlayerData = () => {
  const { publicKey } = useWallet()
  const { gameState, nextEnergyIn, votes,promptIdx } = useGameState()

  return (
    <>
      {gameState && publicKey && (
        <HStack justifyContent="center" spacing={4}>
            <Text>{array[promptIdx]}</Text>
        </HStack>
      )}
    </>
  )
}

export default DisplayPlayerData
