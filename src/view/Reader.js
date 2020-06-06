import React from 'react'

import Table from './Table'

import useReader from '../use/reader'

export default function Reports () {
  const { reports } = useReader()

  function strip (report) {
    const {
      date,
      epoch,
      timestamp,
      ...row
    } = report

    return row
  }

  const data = reports.map(strip)

  return <Table data={data} keyName='id' />
}
