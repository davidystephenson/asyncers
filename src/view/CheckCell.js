import React from 'react'

function format ({
  blocked, done, ignored, skipped, waiting, working
}) {
  if (done) {
    return {
      background: 'green',
      color: 'white',
      text: done.time
    }
  }

  if (waiting) {
    return {
      background: 'orange',
      text: 'waiting'
    }
  }

  if (ignored) {
    return {
      background: 'red',
      text: 'ignored'
    }
  }

  if (skipped) {
    return {
      background: 'red',
      text: 'skipped'
    }
  }

  if (working) {
    return {
      background: 'lightgreen',
      text: 'working'
    }
  }

  if (blocked) {
    return {
      background: 'orangered',
      text: 'blocked'
    }
  }

  return {}
}

export default function CheckCell ({
  section
}) {
  if (section.name === 'express feedback') {
    console.log('section test:', section)
  }

  const formatted = format(section)

  const { text, ...style } = formatted

  return <td style={style}>{text}</td>
}