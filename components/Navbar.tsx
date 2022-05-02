import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Spacer,
  useToast
} from '@chakra-ui/react'
import { useRef } from 'react'
import { scoreJsonType, useScore } from '../context/ScoreContext'
import ExampleScore from '../assets/example-score.json'

const NavBar = () => {
  const { setData } = useScore()
  const fileInput = useRef<HTMLInputElement>(null)
  const toast = useToast()

  return (
    <Flex
      width='100%'
      align='center'
      justify='space-between'
      mb={2}
      px={6}
      py={2}
    >
      <Box pr={6}>
        <Heading as='h2' size='xl'>
          Qino
        </Heading>
      </Box>
      <ButtonGroup variant='ghost' size='md' spacing='3'>
        <Button
          colorScheme='pink'
          onClick={() => {
            fileInput.current?.click()
          }}
        >
          Open Score
        </Button>
        <Button
          colorScheme='purple'
          onClick={() => {
            setData(ExampleScore)
          }}
        >
          Load Sample Score
        </Button>
      </ButtonGroup>
      <input
        hidden
        accept='application/JSON,.qin'
        type='file'
        ref={fileInput}
        onChange={event => {
          console.log(event?.target?.files)
          const reader = new FileReader()
          reader.onload = e => {
            const fileData = e?.target?.result
            if (typeof fileData === 'string') {
              const jsonData:scoreJsonType = JSON.parse(fileData)
              setData(jsonData)
            }
          }
          reader.readAsText(event?.target?.files![0])
          toast({
            title: 'Score loaded.',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'bottom'
          })
        }}
      />
      <Spacer />
    </Flex>
  )
}

export default NavBar
