import React, { useContext } from 'react'

import Section from './Section'
import SectionBadge from './SectionBadge'
import Table from './SmallTable'
import Thead from './Thead'

import {
  curriculumContext,
  studentsContext
} from '../lib'

import CourseCell from '../view/CourseCell'

export default function Courseboard () {
  const {
    sections
  } = useContext(curriculumContext)
  const students = useContext(studentsContext)

  function Row (section, index) {
    function Cell (student) {
      const work = student.sections[index]

      return (
        <CourseCell
          section={work} key={student.name}
        />
      )
    }

    const cells = students.map(Cell)

    const badge = (
      <SectionBadge section={section} />
    )

    return (
      <tr key={section.name}>
        <td>{badge}</td>
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
    <Thead>
      <th>Section</th>
      {heads}
    </Thead>
  )

  const table = <Table>{head}{body}</Table>

  return (
    <Section title='Courseboard'>
      {table}
    </Section>
  )
}
