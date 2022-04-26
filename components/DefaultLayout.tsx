import React from 'react'
import { Container } from '@chakra-ui/react'
import NavBar from './Navbar'
import Footer from './Footer'

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <NavBar />
      <Container>{children}</Container>
      <Footer />
    </React.Fragment>
  )
}

export default DefaultLayout
