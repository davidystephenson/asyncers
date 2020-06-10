import React, { createContext } from 'react'

import useReports from '../use/reports'

const report = createContext()

export function ReportProvider ({ children }) {
  const value = useReports()

  return (
    <report.Provider value={value}>
      {children}
    </report.Provider>
  )
}

export default report
