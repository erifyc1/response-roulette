import { Box, Flex, Heading, Spacer, VStack, Text } from "@chakra-ui/react"
import { useWallet } from "@solana/wallet-adapter-react"
import WalletMultiButton from "@/components/WalletMultiButton"
import DisplayGameState from "@/components/DisplayGameState"
import InitPlayerButton from "@/components/InitPlayerButton"
import SessionKeyButton from "@/components/SessionKeyButton"
import ChopTreeButton from "@/components/ChopTreeButton"
import RequestAirdrop from "@/components/RequestAirdrop"
import DisplayNfts from "@/components/DisplayNfts"
import { BN } from "@coral-xyz/anchor"

export default function Home() {
  const { publicKey } = useWallet()

  return (
    <Box>
      <Flex px={4} py={4}>
        <Spacer />
        <WalletMultiButton />
      </Flex>
      <VStack>
        <Heading>So Lumberjack</Heading>
        {!publicKey && <Text>Connect to devnet wallet!</Text>}
        <DisplayGameState />
        <InitPlayerButton />
        <SessionKeyButton />
        <ChopTreeButton tree_idx={new BN(0)}/>
        <ChopTreeButton tree_idx={new BN(1)}/>
        <ChopTreeButton tree_idx={new BN(2)}/>
        <ChopTreeButton tree_idx={new BN(3)}/>
        <ChopTreeButton tree_idx={new BN(4)}/>
        <ChopTreeButton tree_idx={new BN(5)}/>
        <ChopTreeButton tree_idx={new BN(6)}/>
        <ChopTreeButton tree_idx={new BN(7)}/>
        <ChopTreeButton tree_idx={new BN(8)}/>
        <ChopTreeButton tree_idx={new BN(9)}/>
        {/* <CreateElectionButton /> */}
        <RequestAirdrop />
        <DisplayNfts />
      </VStack>
    </Box>
  )
}
