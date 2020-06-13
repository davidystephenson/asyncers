import React, { useContext } from 'react'

import { reportsContext } from '../lib/'

import Table from './ReportTable'

export default function Reports () {
  const {
    oldest
  } = useContext(reportsContext)

  const heading = <h1>Reports</h1>
  const table = <Table reports={oldest} />

  return <>{heading} {table}</>
}
