import React from 'react'

import BlueBadge from './BlueBadge'

export default function Hours (
  { student, hours }, index
) {
  const key = `${student}${hours}${index}`

  return (
    <BlueBadge key={key}>
      {student} ({hours}h)
    </BlueBadge>
  )
}
