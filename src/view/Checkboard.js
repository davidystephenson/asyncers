import React, { useContext } from 'react'

import Table from './SmallTable'
import Thead from './Thead'

import {
  curriculumContext,
  studentsContext
} from '../lib'

import CheckCell from '../view/CheckCell'

export default function Checkboard () {
  const {
    sections
  } = useContext(curriculumContext)
  const students = useContext(studentsContext)

  function Row (section, index) {
    function Cell (student) {
      const work = student.sections[index]

      return (
        <CheckCell
          section={work} key={student.name}
        />
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
    <Thead>
      <th>Section</th>
      <th>Type</th>
      {heads}
    </Thead>
  )

  const table = <Table>{head}{body}</Table>

  const heading = <h1>Checkboard</h1>

  return <>{heading} {table}</>
}
