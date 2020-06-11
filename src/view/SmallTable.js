import React from 'react'

import Table from 'react-bootstrap/Table'

export default function SmallTable ({
  children
}) {
  return (
    <Table hover responsive size='sm'>
      {children}
    </Table>
  )
}
