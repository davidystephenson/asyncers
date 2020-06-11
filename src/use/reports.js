import { useContext } from 'react'

import curriculum from '../lib/curriculum'

import useFetch from './fetch'

const STUDENT = 'whatIsYourName?'
const TYPE = 'whatDidYouJustFinish?'
const EXERCISE = 'whatExerciseDidYouFinish?'
const LECTURE = 'whatLectureDidYouFinish?'
const FEEDBACK = 'whatFeedbackDidYouFinish?'
const DEMO = 'whatDemoDidYouFinish?'
const QUESTION = 'doYouHaveAnyQuestions?'
const HELP = 'wouldYouLikeHelpNow?'
const WELCOME = 'whatWelcomeSessionDidYouFinish?'
const KICKOFF = 'whatKickoffDidYouFinish?'

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

    const student = extract(STUDENT)
    const type = extract(TYPE)
    const exercise = extract(EXERCISE)
    const lecture = extract(LECTURE)
    const feedback = extract(FEEDBACK)
    const demo = extract(DEMO)
    const question = extract(QUESTION)
    const help = extract(HELP)
    const welcome = extract(WELCOME)
    const kickoff = extract(KICKOFF)

    const types = {
      welcome,
      exercise,
      lecture,
      feedback,
      demo,
      kickoff
    }

    const section = types[type]
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

  return copy
}
