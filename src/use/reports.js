import { useContext } from 'react'

import { curriculumContext } from '../lib/'

import useFetch from './fetch'

const DEMO = 'whatDemoDidYouFinish?'
const EXERCISE = 'whatExerciseDidYouFinish?'
const FEEDBACK = 'whatFeedbackDidYouFinish?'
const HELP = 'wouldYouLikeHelpNow?'
const KICKOFF = 'whatKickoffDidYouFinish?'
const LECTURE = 'whatLectureDidYouFinish?'
const PROJECT = 'whatProjectDidYouFinish?'
const QUESTION = 'doYouHaveAnyQuestions?'
const STUDENT = 'whatIsYourName?'
const TYPE = 'whatDidYouJustFinish?'
const WELCOME = 'whatWelcomeSessionDidYouFinish?'

export default function useReports () {
  const {
    sections
  } = useContext(curriculumContext)

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
    const project = extract(PROJECT)
    const kickoff = extract(KICKOFF)

    const types = {
      welcome,
      exercise,
      lecture,
      feedback,
      demo,
      project,
      kickoff
    }

    const section = types[type]
    const entity = sections
      .find(({ name }) => name === section)

    if (!entity) {
      console.warn('missing section:', section)
      console.warn('available sections:', sections)
    }

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
      index: entity.index,
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
