import React, { createContext } from 'react'

import useProgress from '../use/Progress'

const progress = createContext()

export function ProgresProvider ({ children }) {
  const value = useProgress()

  return (
    <progress.Provider value={value}>
      {children}
    </progress.Provider>
  )
}

export default progress
