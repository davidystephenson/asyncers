import React from 'react'

export default function Caption ({
  children, title
}) {
  const heading = <h1>{title}</h1>

  return <>{heading} {children}</>
}
