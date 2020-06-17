import React, { useContext } from 'react'

import { tableContext } from '../lib/'

import Row from './Row'

export default function Rows () {
  const {
    data, keyName
  } = useContext(tableContext)

  function Rower (datum, index) {
    const { key, ...data } = datum
    const keyValue = datum[keyName]

    const value = key || keyValue || index

    return <Row data={data} key={value} />
  }

  const trs = data.map(Rower)

  return <>{trs}</>
}
