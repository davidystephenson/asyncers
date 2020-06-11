import React, { useContext } from 'react'

import Table from './SmallTable'

import curriculum from '../lib/curriculum'
import report from '../lib/report'

export default function Checkboard () {
  const { sections } = useContext(curriculum)

  const {
    reports, students
  } = useContext(report)

  console.log('reports test:', reports)

  console.log('students test:', students)

  function Row (section, index) {
    const similar = filter(
      'type', section.type, reports
    )

    function filter (
      key, value, array = similar
    ) {
      return array.filter(
        report => report[key] === value
      )
    }

    const same = filter(
      'section', section.name
    )

    function Cell (student) {
      const theirs = filter(
        'student', student, reports
      )

      function did (report) {
        const isSection = same.includes(report)

        const isStudent = theirs
          .includes(report)

        return isSection && isStudent
      }

      const done = same.find(did)

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
        } else {
          const more = similar.some(
            element => element.index > index
          )

          if (more) {
            style.background = 'darkred'
          }
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
    return <th key={student}>{student}</th>
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
