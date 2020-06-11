import { useContext } from 'react'

import curriculum from '../lib/curriculum'

import useFetch from './fetch'

export default function useReports () {
  const { sections } = useContext(curriculum)

  const URL = 'https://v2-api.sheety.co/f8d9905dd113821929ea3ad4e3f09c41/progress/reports'

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

    // todo CONSTANTS
    const STUDENT_KEY = 'whatIsYourName?'

    const student = extract(STUDENT_KEY)
    const type = extract('whatDidYouJustFinish?')
    const exercise = extract('whatExerciseDidYouFinish?')
    const lecture = extract('whatLectureDidYouFinish?')
    const feedback = extract('whatFeedbackDidYouFinish?')
    const demo = extract('whatDemoDidYouFinish?')
    const question = extract('doYouHaveAnyQuestions?')
    const help = extract('wouldYouLikeHelpNow?')

    const types = {
      exercise,
      lecture,
      feedback,
      demo
    }

    const section = types[type]
    const index = sections.findIndex(
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
      type,
      index,
      time,
      help,
      question,
      timestamp: report.timestamp
    }
  }

  if (response.data) {
    const raw = response.data.reports

    const parsed = raw.map(parse)

    copy.reports = parsed
  }

  copy.oldest = [...copy.reports]
    .sort((a, b) => a.date - b.date)

  const students = copy
    .reports
    .map(report => report.student)

  copy.students = [...new Set(students)]

  console
    .log('copy.students test:', copy.students)

  return copy
}
