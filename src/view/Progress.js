import React, { useContext } from 'react'

import Badge from 'react-bootstrap/Badge'

import Table from './Table'

import curriculum from '../lib/curriculum'
import report from '../lib/report'

function named (array, name) {
  return array
    .find(element => element.name === name)
}

export default function Progress () {
  const { sections } = useContext(curriculum)
  const { reports } = useContext(report)

  sections.forEach(section => (section.students = []))

  const names = reports.map(report => report.name)

  const unique = [...new Set(names)]

  const reversed = [...reports].reverse()

  function identify (name) {
    const {
      student, section
    } = named(reversed, name)

    const last = named(sections, section)

    const id = (
      <Badge variant='primary' key={student}>
        {student}
      </Badge>
    )

    last.students.push(id)
  }

  unique.forEach(identify)

  return (
    <>
      <h1>Progress</h1>

      <Table data={sections} keyName='name' />
    </>
  )
}
