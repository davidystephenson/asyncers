import React from 'react'

import Badge from 'react-bootstrap/Badge'

import Table from './Table'

import useCurriculum from '../use/curriculum'
import useReader from '../use/reader'

export default function Progress () {
  const { sections } = useCurriculum()

  sections.forEach(section => (section.students = []))

  const { reports } = useReader(0)

  const names = reports.map(report => report.name)

  const students = [...new Set(names)]

  students.forEach(student => {
    const last = [...reports]
      .reverse()
      .find(report => report.name === student)

    const section = sections
      .find(section => section.name === last.section)

    const badge = (
      <Badge variant='primary' key={last.id}>
        {last.name}
      </Badge>
    )

    section.students.push(badge)
  })

  return (
    <>
      <h1>Progress</h1>

      <Table data={sections} keyName='name' />
    </>
  )
}
