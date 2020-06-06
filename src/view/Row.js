import React, { useContext } from 'react'

import table from '../lib/table'

import Cell from './Cell'

export default function Row (data) {
  const value = useContext(table)

  const key = data[value.key]

  const tds = Object
    .entries(data)
    .map(Cell)

  return <tr key={key}>{tds}</tr>
}
