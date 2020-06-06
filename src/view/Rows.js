import { useContext } from 'react'

import table from '../lib/table'

import Row from './Row'

export default function Rows () {
  const { data } = useContext(table)

  return data.map(Row)
}
