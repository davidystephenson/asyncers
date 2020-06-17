import React from 'react'

import toTitleCase from 'to-title-case'

export default function Header (key) {
  if (key === 'key') {
    return null
  }

  const title = key === 'id'
    ? 'ID'
    : toTitleCase(key)

  return <th key={key}>{title}</th>
}
