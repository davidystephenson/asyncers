import React, { createContext } from 'react'

import Provide from './Provide'

export default function construct (
  hook, name
) {
  const context = createContext()

  function Provider ({ children, value }) {
    return (
      <Provide
        context={context}
        hook={hook}
        value={value}
      >
        {children}
      </Provide>
    )
  }

  const lower = name.toLowerCase()

  const contextKey = `${lower}Context`
  const providerKey = `${name}Provider`

  return {
    [contextKey]: context,
    [providerKey]: Provider
  }
}
