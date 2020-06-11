import React, { useContext } from 'react'

import Badge from 'react-bootstrap/Badge'

import Table from './Table'

import curriculum from '../lib/curriculum'
import report from '../lib/report'

function enroll (section) {
  return { ...section, students: [] }
}

export default function Progress () {
  const { sections } = useContext(curriculum)
  const {
    reports, students
  } = useContext(report)

  const works = sections.map(enroll)

  const reversed = [...reports].reverse()

  console.log('reversed test:', reversed)

  function identify (name) {
    console.log('identify name test:', name)

    const {
      student, section
    } = reversed
      .find(report => report.student === name)

    console.log('identify section test:', section)

    const last = works
      .find(work => work.name === section)

    console.log('last test:', last)

    const id = (
      <Badge variant='primary' key={student}>
        {student}
      </Badge>
    )

    last.students.push(id)
  }

  students.forEach(identify)

  return (
    <>
      <h1>Progress</h1>

      <Table data={sections} keyName='name' />
    </>
  )
}
