import React from 'react'

import Badge from 'react-bootstrap/Badge'

function color (status) {
  switch (status) {
    case 'blocked': return 'danger'
    case 'waiting': return 'warning'
    case 'working': return 'success'
    default: return 'primary'
  }
}

export default function StatusBadge (
  { status, name, children }
) {
  const variant = color(status)

  const content = children || name

  return (
    <Badge variant={variant}>
      {content}
    </Badge>
  )
}
