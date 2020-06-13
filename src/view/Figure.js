import React from 'react'

import Table from './Table'

export default function Figure ({
  data,
  keyName,
  title
}) {
  const heading = <h1>{title}</h1>

  const table = (
    <Table data={data} keyName={keyName} />
  )

  return <>{heading} {table}</>
}
