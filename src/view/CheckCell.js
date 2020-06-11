import React from 'react'

export default function CheckCell ({
  done, theirs, index, section, similar, student
}) {
  const style = {}

  let content = null

  if (done) {
    style.background = 'green'
    style.color = 'white'

    content = done.time
  } else {
    const { ignored, skipped } = section

    if (ignored) {
      style.background = 'red'
    }

    if (skipped) {
      style.background = 'darkred'
    }
  }

  return (
    <td style={style} key={student}>
      {content}
    </td>
  )
}
