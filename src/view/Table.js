import React from 'react'

import SmallTable from './SmallTable'

import table from '../lib/table'

import Headers from './Headers'
import Rows from './Rows'
import Thead from './Thead'

export default function Table (props) {
  if (!props.data || !props.data.length) {
    return null
  }

  return (
    <table.Provider value={props}>
      <SmallTable>
        <Thead>
          <Headers />
        </Thead>

        <tbody>
          <Rows />
        </tbody>
      </SmallTable>
    </table.Provider>
  )
}
