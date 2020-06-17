import React from 'react'

import Badge from 'react-bootstrap/Badge'
import StatusBadge from './StatusBadge'

export default function Hours (
  { student, hours, status }, index
) {
  const key = `${student}${hours}${index}`
  const badge = <Badge variant='light'>{hours}h</Badge>

  return (
    <StatusBadge status={status} key={key}>
      {student} {badge}
    </StatusBadge>
  )
}
