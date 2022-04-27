import { createContext, useContext, ReactNode, useState } from 'react'

type scoreContextType = {
  data?: string | null
  setData: (d: string) => void
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
  const [data, setData] = useState<string | undefined>(undefined)

  return (
    <scoreContext.Provider value={{ data, setData }}>
      {children}
    </scoreContext.Provider>
  )
}
