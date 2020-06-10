import React, { createContext } from 'react'

import useCurriculum from '../use/curriculum'

const curriculum = createContext()

export function CurriculumProvider ({ children }) {
  const value = useCurriculum()

  return (
    <curriculum.Provider value={value}>
      {children}
    </curriculum.Provider>
  )
}

export default curriculum
