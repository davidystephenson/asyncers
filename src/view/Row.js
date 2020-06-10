import React from 'react'

import Cell from './Cell'

export default function Row ({ data }) {
  // console.log('data test:', data)

  const entries = Object.entries(data)
  // console.log('entry test:', entries[0])
  const tds = entries.map(Cell)

  return <tr>{tds}</tr>
}
