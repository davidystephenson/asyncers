import React from 'react'

import SmallTable from './SmallTable'

import table from '../lib/table'

import Headers from './Headers'
import Rows from './Rows'

export default function Table (props) {
  if (!props.data || !props.data.length) {
    return null
  }

  return (
    <table.Provider value={props}>
      <SmallTable>
        <thead>
          <tr>
            <Headers />
          </tr>
        </thead>

        <tbody>
          <Rows />
        </tbody>
      </SmallTable>
    </table.Provider>
  )
}
