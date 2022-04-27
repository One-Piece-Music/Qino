import { Center, Text, Link } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Center w='100%' h='48px' as='footer'>
      <Text>
        <Link href='https://github.com/One-Piece-Music/' isExternal>
          Yimusic
        </Link>
        {' © 2022'}
      </Text>
    </Center>
  )
}

export default Footer
