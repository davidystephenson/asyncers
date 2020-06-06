import { useContext } from 'react'

import table from '../lib/table'

import Header from './Header'

export default function Headers () {
  const { data: [datum] } = useContext(table)

  return Object
    .keys(datum)
    .map(Header)
}
