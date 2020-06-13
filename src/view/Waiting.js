import React from 'react'

import Figure from './Figure'
import Hours from './Hours'

import useProgress from '../use/progress'

export default function Waiting () {
  const students = useProgress()

  function track (done, student) {
    const did = student
      .sections
      .filter(section => section.waiting)

    return [...done, ...did]
  }

  const done = students.reduce(track, [])

  function arrange (waiting, report) {
    const { section } = report

    const reports = waiting[section] || []

    waiting[section] = [...reports, report]

    return waiting
  }

  const arranged = done.reduce(arrange, {})

  function type ([section, reports]) {
    const students = reports.map(Hours)

    function time (total, report) {
      return total + report.hours
    }

    const total = reports.reduce(time, 0)

    return { section, students, total }
  }

  const typed = Object
    .entries(arranged)
    .map(type)

  return (
    <Figure
      data={typed}
      keyName='section'
      title='Waiting'
    />
  )
}
