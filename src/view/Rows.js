import React, { useContext } from 'react'

import { tableContext } from '../lib/'

import Row from './Row'

export default function Rows () {
  const {
    data, keyName
  } = useContext(tableContext)

  function Rower (datum, index) {
    const keyValue = datum[keyName]

    const key = keyValue || index

    return <Row data={datum} key={key} />
  }

  const trs = data.map(Rower)

  return <>{trs}</>
}
