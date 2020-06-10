import React, { useContext } from 'react'

import Badge from 'react-bootstrap/Badge'

import Table from './Table'

import curriculum from '../lib/curriclum'
import report from '../lib/report'

function Row (section) => {


}


export default function Checkboard () {
  const { sections } = useContext(curriculum)
  const { reports } = useContext(report)

  const rows = sections.map(section => )

  return (
    <>
      <h1>Progress</h1>

      <Table data={sections} keyName='name' />
    </>
  )
}
