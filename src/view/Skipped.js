import React from 'react'

import Name from './Name'
import Status from './Status'

function count (total) { return total + 1 }

export default function Skipped () {
  return (
    <Status
      status='Skipped'
      reducer={count}
      View={Name}
    />
  )
}
