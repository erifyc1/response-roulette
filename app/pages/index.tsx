import { Box, Flex, Heading, Spacer, VStack, Text, HStack } from "@chakra-ui/react"
import { useWallet } from "@solana/wallet-adapter-react"
import WalletMultiButton from "@/components/WalletMultiButton"
import SessionKeyButton from "@/components/SessionKeyButton"
import InitPlayerButton from "@/components/InitPlayerButton"
import ChopTreeButton from "@/components/ChopTreeButton"
import RequestAirdrop from "@/components/RequestAirdrop"
import { BN } from "@coral-xyz/anchor"
import DisplayGameState from "@/components/DisplayGameState"
import ChangePromptButton from "@/components/ChangePromptButton"
// import DisplayNfts from "@/components/DisplayNfts"

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
        <Text>Some stuff here</Text>
        <Text>Some stuff here</Text>
        <ChangePromptButton />

        <DisplayGameState />
        <Spacer height="1000px"/>
        {!publicKey && <Text>Connect to devnet wallet!</Text>}
        <HStack>
          <ChopTreeButton tree_idx={new BN(0)}/>
          <ChopTreeButton tree_idx={new BN(1)}/>
        </HStack>
        {/* <CreateElectionButton /> */}
        {/* <DisplayNfts /> */}
      </VStack>
    </Box>
  )
}
