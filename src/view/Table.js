import React from 'react'

import BootstrapTable from 'react-bootstrap/Table'

import table from '../lib/table'

import Headers from './Headers'
import Rows from './Rows'

export default function Table ({ data, keyName }) {
  if (!data || !data.length) {
    return null
  }

  const value = { data, key: keyName }

  return (
    <table.Provider value={value}>
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
