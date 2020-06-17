import React from 'react'

import useTrack from '../use/track'

import Figure from './Figure'

const statuses = [
  'blocked',
  'waiting',
  'working'
]

export default function Agenda () {
  function tracker (section) {
    const status = statuses
      .find(status => section[status])

    if (status) {
      return {
        ...section, status
      }
    }

    return section
  }

  const sections = useTrack(tracker)

  return (
    <Figure
      data={sections}
      title='Agenda'
    />
  )
}
