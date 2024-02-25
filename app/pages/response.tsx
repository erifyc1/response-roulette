import { Box, Flex, Heading, Spacer, VStack, Text, HStack } from "@chakra-ui/react"
import { useWallet } from "@solana/wallet-adapter-react"
import WalletMultiButton from "@/components/WalletMultiButton"
import SessionKeyButton from "@/components/SessionKeyButton"
import InitPlayerButton from "@/components/InitPlayerButton"
import RequestAirdrop from "@/components/RequestAirdrop"
import InputResponse from "@/components/Response"

export default function Home() {
  const { publicKey } = useWallet()

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
      <Heading>Response Roulette</Heading>
      <InputResponse/>
      </VStack>
    </Box>
  )
}
