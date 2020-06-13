import React from 'react'

import Badge from 'react-bootstrap/Badge'

export default function BlueBadge ({
  key, children
}) {
  if (!key) key = children

  return (
    <Badge variant='primary' key={key}>
      {children}
    </Badge>
  )
}
