import React, { useContext } from 'react'

import Badge from 'react-bootstrap/Badge'

import Table from './Table'

import {
  curriculumContext, reportsContext
} from '../lib/report'

function enroll (section) {
  return { ...section, students: [] }
}

export default function Progress () {
  const {
    sections
  } = useContext(curriculumContext)
  const {
    reports, students
  } = useContext(reportsContext)

  const works = sections.map(enroll)

  const reversed = [...reports].reverse()

  function identify (name) {
    const { section } = reversed
      .find(report => report.student === name)

    const last = works
      .find(work => work.name === section)

    const id = (
      <Badge variant='primary' key={name}>
        {name}
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
