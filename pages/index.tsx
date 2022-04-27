import { Box, Flex, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { useScore } from '../context/ScoreContext'

const Home: NextPage = () => {
  const { data } = useScore()
  return (
    <React.Fragment>
      <Head>
        <title>Qino</title>
        <meta
          name='description'
          content='A web-based Guqin notation engraver'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {data !== null && data !== undefined && (
        <Box maxHeight='86%' height='86%' m='auto'>
          <Flex className='jianzipu' flexDirection='column'>
            <Box
              overflowX='scroll'
              height='86%'
              p={2}
              letterSpacing='1px'
              style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}
            >
              <Text fontSize='32px'>{data}</Text>
            </Box>
          </Flex>
        </Box>
      )}
    </React.Fragment>
  )
}

export default Home
