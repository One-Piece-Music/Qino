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
        <Box maxHeight='85%' height='85%' m='auto'>
          <Flex className='jianzipu' flexDirection='column'>
            <Box
              overflowX='scroll'
              height='85%'
              p={2}
              pb='24px'
              style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}
            >
              <Text fontSize='54px'>{data.title}</Text>
              {data.score.map((line, index) => {
                return (
                  // replace full-width space with wider space
                  <Text fontSize='36px' key={index}>
                    {line.replaceAll(' ', '\uE00C')}
                  </Text>
                )
              })}
            </Box>
          </Flex>
        </Box>
      )}
    </React.Fragment>
  )
}

export default Home
