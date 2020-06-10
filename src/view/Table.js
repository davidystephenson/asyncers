import React from 'react'

import BootstrapTable from 'react-bootstrap/Table'

import table from '../lib/table'

import Headers from './Headers'
import Rows from './Rows'

export default function Table (props) {
  if (!props.data || !props.data.length) {
    return null
  }

  return (
    <table.Provider value={props}>
      <BootstrapTable
        bordered
        hover
        responsive
        size='sm'
        striped
      >
        <thead>
          <tr>
            <Headers />
          </tr>
        </thead>

        <tbody>
          <Rows />
        </tbody>
      </BootstrapTable>
    </table.Provider>
  )
}
