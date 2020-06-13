import React, { createContext } from 'react'

import Provide from './Provide'

export default function context (hook) {
  const context = createContext()

  function Provider ({ children }) {
    return (
      <Provide context={context} hook={hook}>
        {children}
      </Provide>
    )
  }

  return { context, Provider }
}
