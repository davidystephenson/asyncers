import React, { useContext } from 'react'

import Table from './SmallTable'

import curriculum from '../lib/curriculum'

import useProgress from '../use/progress'

export default function Checkboard () {
  const { sections } = useContext(curriculum)
  const students = useProgress()

  function Row (section, index) {
    function Cell (student) {
      const work = student.sections[index]

      const {
        done, ignored, skipped
      } = work

      const style = {}

      let content = null

      if (done) {
        style.background = 'green'
        style.color = 'white'

        content = done.time
      } else {
        if (ignored) {
          style.background = 'red'
        } else if (skipped) {
          style.background = 'darkred'
        }
      }

      return (
        <td style={style} key={student}>
          {content}
        </td>
      )
    }

    const cells = students.map(Cell)

    const { name, type } = section

    return (
      <tr key={name}>
        <td>{name}</td>
        <td>{type}</td>
        {cells}
      </tr>
    )
  }

  function Header (student) {
    const { name } = student

    return <th key={name}>{name}</th>
  }

  const rows = sections.map(Row)
  const body = <tbody>{rows}</tbody>

  const heads = students.map(Header)
  const head = (
    <thead>
      <tr>
        <th>Section</th>
        <th>Type</th>
        {heads}
      </tr>
    </thead>
  )

  const table = <Table>{head}{body}</Table>

  const heading = <h1>Checkboard</h1>

  return <>{heading} {table}</>
}
