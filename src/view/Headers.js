import { useContext } from 'react'

import { tableContext } from '../lib'

import Header from './Header'

export default function Headers () {
  const {
    data: [datum]
  } = useContext(tableContext)

  return Object
    .keys(datum)
    .map(Header)
}
