import React from 'react'

import Table from 'react-bootstrap/Table'

export default function SmallTable ({
  children
}) {
  return (
    <Table
      bordered
      hover
      responsive
      size='sm'
      striped
    >
      {children}
    </Table>
  )
}
