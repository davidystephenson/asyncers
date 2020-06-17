import React from 'react'

import Badge from 'react-bootstrap/Badge'

function format (type) {
  switch (type) {
    case 'welcome': return '#62d26f'
    case 'kickoff': return '#e8384f'
    case 'evaluation': return '#fd9a00'
    case 'feedback': return '#eec300'
    case 'lecture': return '#a4cf30'
    case 'demo': return '#37c5ab'
    case 'exercise': return '#20aaea'
    case 'project': return '#4186e0'
    case 'independent': return '#7a6ff0'
    default: return null
  }
}

export default function SectionBadge (
  { section, children }
) {
  const background = format(section.type.name)

  const style = {
    background, color: 'white'
  }

  const content = children || section.name

  return (
    <Badge pill style={style}>
      {content}
    </Badge>
  )
}
