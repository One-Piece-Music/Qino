import { createContext, useContext, ReactNode, useState } from 'react'

export interface scoreJsonType {
  title: string
  author: string
  tuning: string
  description: string
  score: string[]
}

type scoreContextType = {
  data?: scoreJsonType | null
  setData: (d: scoreJsonType) => void
}

const scoreContextDefaultValues: scoreContextType = {
  data: undefined,
  setData: () => {}
}

const scoreContext = createContext<scoreContextType>(scoreContextDefaultValues)

export function useScore () {
  return useContext(scoreContext)
}

type Props = {
  children: ReactNode
}

export function ScoreProvider ({ children }: Props) {
  const [data, setData] = useState<scoreJsonType | undefined>(undefined)

  return (
    <scoreContext.Provider value={{ data, setData }}>
      {children}
    </scoreContext.Provider>
  )
}
