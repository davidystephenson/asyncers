import React from 'react'

import Badge from 'react-bootstrap/Badge'

import Table from './SmallTable'

import useProgress from '../use/progress'

function hours (epoch) {
  const seconds = epoch / 1000
  const minutes = seconds / 60
  const hours = minutes / 60

  return Math.floor(hours)
}

export default function Waiting () {
  const students = useProgress()

  const done = []

  students.forEach(student => {
    student.sections.forEach(section => {
      if (section.waiting) {
        done.push(section)
      }
    })
  })

  const combined = {}

  done.forEach(report => {
    const { section } = report

    const combination = combined[section]

    if (combination) {
      combination.push(report)
    } else {
      combined[section] = [report]
    }
  })

  const waiting = Object.entries(combined)

  function Row ([section, reports]) {
    function measure (report) {
      const { student, since } = report
      const then = since.done.date.getTime()
      const now = new Date().getTime()
      const difference = now - then

      const time = hours(difference)

      return { student, time }
    }

    const measures = reports.map(measure)

    function Id ({ student, time }) {
      return (
        <Badge variant='primary' key={student}>
          {student} ({time}h)
        </Badge>
      )
    }

    const ids = measures.map(Id)

    const total = measures.reduce(
      (total, measure) => total + measure.number,
      0
    )

    console.log('total test:', total)

    return (
      <tr key={section}>
        <td>{section}</td>
        <td>{ids}</td>
        <td>{total}</td>
      </tr>
    )
  }

  const rows = waiting.map(Row)
  const body = <tbody>{rows}</tbody>

  const head = (
    <thead>
      <tr>
        <th>Section</th>
        <th>Students</th>
        <th>Total</th>
      </tr>
    </thead>
  )

  const table = <Table>{head}{body}</Table>

  const heading = <h1>Waiting</h1>

  return <>{heading} {table}</>
}
