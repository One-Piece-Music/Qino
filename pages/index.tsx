import { Container, Flex, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Qino</title>
        <meta
          name='description'
          content='A web-based Guqin notation engraver'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Container maxHeight='86%' maxW='1280px' m='auto'>
        <Flex className='jianzipu' flexDirection='column'>
          <Container
            overflowX='scroll'
            maxHeight='86%'
            p={16}
            letterSpacing='1px'
            style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}
          >
            <Text fontSize='32px'>
              {'\uE005 = \uE000\uE001\uE002\uE003\uE004'}
            </Text>
            <Text fontSize='32px'>
              {'\uE000\uE001\uE002\uE003\uE004 Lorem Ipsum!'}
            </Text>
          </Container>
        </Flex>
      </Container>
    </div>
  )
}

export default Home
