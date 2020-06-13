import React from 'react'

import BlueBadge from './BlueBadge'

export default function Name ({
  student, index
}) {
  const key = `${student}${index}`

  return (
    <BlueBadge key={key}>{student}</BlueBadge>
  )
}
