import { Center, Text, Link } from '@chakra-ui/react'

const Footer = () => {
  return (
    <footer>
      <Center h='60px'>
        <Text>
          <Link href='https://github.com/One-Piece-Music/' isExternal>
            Yimusic
          </Link>
          {' © 2022'}
        </Text>
      </Center>
    </footer>
  )
}

export default Footer
