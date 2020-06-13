import React from 'react'

export default function Thead ({
  children, headers
}) {
  return (
    <thead>
      <tr>{headers}{children}</tr>
    </thead>
  )
}
