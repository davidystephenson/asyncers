import { useContext } from 'react'

import { curriculumContext } from '../lib/'

import useFetch from './fetch'

export default function useReports () {
  const {
    sections
  } = useContext(curriculumContext)

  const URL = 'https://v2-api.sheety.co/f8d9905dd113821929ea3ad4e3f09c41/progress/evaluations'

  const response = useFetch(URL)

  const copy = { ...response, reports: [] }

  function parse (report) {
    function extract (key) {
      const value = report[key]

      if (typeof value === 'string') {
        const lower = value.toLowerCase()

        return lower
      }

      return value
    }

    const student = extract('who')
    const section = extract('what')
    const score = extract('score')
    const comments = extract('comments')

    const { index } = sections.find(
      element => element.name === section
    )

    const epoch = Date.parse(report.timestamp)
    const date = new Date(epoch)
    // TODO remove
    const time = date.toISOString()

    return {
      date,
      epoch,
      section,
      student,
      type: 'evaluation',
      index,
      time,
      score,
      comments,
      timestamp: report.timestamp
    }
  }

  if (response.data) {
    const raw = response.data.evaluations

    const parsed = raw.map(parse)

    copy.reports = parsed
  }

  const evaluations = [...copy.reports]
    .sort((a, b) => a.date - b.date)

  return evaluations
}
