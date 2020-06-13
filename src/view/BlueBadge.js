import React from 'react'

import Badge from 'react-bootstrap/Badge'

export default function BlueBadge ({
  children
}) {
  return (
    <Badge variant='primary'>{children}</Badge>
  )
}
