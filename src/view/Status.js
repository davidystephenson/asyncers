import React from 'react'

import useStatus from '../use/status'

import Figure from './Figure'

export default function Status ({
  status, reducer, View
}) {
  const sections = useStatus(
    status, reducer, View
  )

  return (
    <Figure
      data={sections}
      keyName='section'
      title={status}
    />
  )
}
