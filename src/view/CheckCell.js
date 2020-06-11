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
    const later = theirs.some(
      element => element.index > index
    )

    const { blocking } = section

    const skipped = blocking && later

    if (section.name === 'installation instructions') {
      console.log('theirs test:', theirs)
      console.log('later test:', later)
      console.log('blocking test:', blocking)
      console.log('skipped test:', skipped)
    }

    if (skipped) {
      style.background = 'red'
    }

    const more = similar.some(
      element => element.index > index
    )

    if (more) {
      style.background = 'darkred'
    }
  }

  return (
    <td style={style} key={student}>
      {content}
    </td>
  )
}
