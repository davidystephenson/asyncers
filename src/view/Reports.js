import React, { useContext } from 'react'

import report from '../lib/report'

import Table from './ReportTable'

export default function Reports () {
  const { oldest } = useContext(report)

  const heading = <h1>Reports</h1>
  const table = <Table reports={oldest} />

  return <>{heading} {table}</>
}
