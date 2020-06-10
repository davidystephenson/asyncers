import React from 'react'

import Table from './Table'

export default function ReportTable ({ reports }) {
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
