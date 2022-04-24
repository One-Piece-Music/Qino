import { Flex, Heading } from '@chakra-ui/react'

const NavBar = () => {
  return (
    <Flex width='100%' align="center" justify='space-between' mb={8} px={16} py={8}>
      <Heading as='h2' size='xl' m={0}>
        Qino
      </Heading>
    </Flex>
  )
}

export default NavBar
