import React from 'react'

export default function Provide ({
  children, context, hook, value
}) {
  const hooked = hook && hook()

  const valued = value || hooked

  return (
    <context.Provider value={valued}>
      {children}
    </context.Provider>
  )
}
