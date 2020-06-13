import { useContext } from 'react'

import { studentsContext } from '../lib'

import Hours from '../view/Hours'

export default function useStatus (
  status, reducer, View
) {
  status = status.toLowerCase()

  const students = useContext(studentsContext)

  function track (done, student) {
    const did = student
      .sections
      .filter(section => section[status])

    return [...done, ...did]
  }

  const done = students.reduce(track, [])

  function arrange (arranged, report) {
    const { section } = report

    const reports = arranged[section] || []

    arranged[section] = [...reports, report]

    return arranged
  }

  const arranged = done.reduce(arrange, {})

  function time (total, report) {
    return total + report.hours
  }

  reducer = reducer || time

  View = View || Hours

  function type ([section, reports]) {
    const students = reports.map(View)

    const total = reports.reduce(reducer, 0)

    return { section, students, total }
  }

  const typed = Object
    .entries(arranged)
    .map(type)

  return typed
}
