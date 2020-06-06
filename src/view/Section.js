import React from 'react'

export default function Section ({
  name, type
}) {
  return (
    <tr key={name}>
      <td>{name}</td>
      <td>{type}</td>
    </tr>
  )
}
