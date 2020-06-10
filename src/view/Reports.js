import React, { useContext } from 'react'

import report from '../lib/report'

import ReportTable from './ReportTable'

export default function Reports () {
  const { oldest } = useContext(report)

  console.log('oldest test:', oldest)

  return (
    <>
      <h1>Reports</h1>

      <ReportTable reports={oldest} />
    </>
  )
}
