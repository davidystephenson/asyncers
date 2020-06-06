import React from 'react'

export default function Report ({
  id, iso, name, number, section
}) {
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{name}</td>
      <td>{number}</td>
      <td>{section}</td>
      <td>{iso}</td>
    </tr>
  )
}
