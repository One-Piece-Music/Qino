import '../styles/globals.css'
import { AppProps } from 'next/app'
import DefaultLayout from '../components/DefaultLayout'
import { ScoreProvider } from '../context/ScoreContext'
import { ChakraProvider } from '@chakra-ui/react'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ScoreProvider>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </ScoreProvider>
    </ChakraProvider>
  )
}

export default MyApp
