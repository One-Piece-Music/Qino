import React from 'react'
import { Container } from '@chakra-ui/react'
import NavBar from './Navbar'

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <NavBar />
      <Container>{children}</Container>
    </React.Fragment>
  )
}

export default DefaultLayout
