import '../styles/globals.css'
import { AppProps } from 'next/app'
import DefaultLayout from '../components/DefaultLayout'
// import { ChakraProvider } from '@chakra-ui/react'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
  // <ChakraProvider>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
  // </ChakraProvider>
  )
}

export default MyApp
