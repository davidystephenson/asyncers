import React, { useContext } from 'react'

import { studentsContext } from '../lib'

import Hours from '../view/Hours'
import SectionBadge from '../view/SectionBadge'

export default function useStatus (
  tracker, reducer, View
) {
  const students = useContext(studentsContext)

  function track (done, student) {
    const did = student
      .sections
      .map(tracker)
      .filter(section => section.status)

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

  function aggregate ([section, reports]) {
    const entity = done.find(
      element => element.name === section
    )

    const total = reports.reduce(reducer, 0)
    reports.forEach(
      report => (report.status = entity.status)
    )

    return { entity, reports, section, total }
  }

  const entries = Object.entries(arranged)
  const aggregated = entries.map(aggregate)

  const statuses = [
    'blocked',
    'waiting',
    'working'
  ]

  function findIndex (section) {
    const { status } = section.entity

    return statuses.indexOf(status)
  }

  function sort (a, b) {
    const aIndex = findIndex(a)
    const bIndex = findIndex(b)

    const difference = aIndex - bIndex

    if (difference === 0) {
      return b.total - a.total
    }

    return difference
  }

  const sorted = [...aggregated].sort(sort)

  function format ({
    entity, reports, section, total
  }) {
    const badge = (
      <SectionBadge section={entity} />
    )

    const students = reports.map(View)

    return {
      section: badge,
      key: section,
      students,
      total
    }
  }

  const formatted = sorted.map(format)

  return formatted
}
