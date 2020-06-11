import { useContext } from 'react'

import curriculum from '../lib/curriculum'
import report from '../lib/report'

const RELATIONS = [
  ['installation instructions', 'prework'],
  ['first practice feedback', 'first practice'],
  ['first evaluation', 'first assessment'],
  ['first retry evaluation', 'first retry'],
  ['second practice feedback', 'second practice'],
  ['second evaluation', 'second assessment'],
  ['second retry evaluation', 'second retry'],
  ['graphql', 'apply typescript'],
  ['jest', 'apply graphql'],
  ['react native', 'apply jest'],
  ['realtime apps', 'apply react native'],
  ['portfolio feedback', 'portfolio project'],
  ['portfolio evaluation', 'portfolio work from home'],
  ['final demo', 'final project']
]

function filter (key, value, array) {
  return array.filter(
    report => report[key] === value
  )
}

export default function useProgress () {
  const course = useContext(curriculum)
  const {
    reports, students
  } = useContext(report)

  function track (student) {
    const theirs = filter(
      'student', student, reports
    )

    function check (section, index) {
      const { name, blocking, type } = section

      function after (element) {
        return element.index > index
      }

      const done = theirs.find(
        report => report.section === name
      )

      const data = { ...section, done }

      if (!done) {
        data.later = theirs.some(after)

        const retry = name.includes('retry')

        if (data.later && !retry) {
          if (blocking) data.ignored = true
          else {
            const similar = theirs.filter(
              report => report.type === type
            )

            console.log('similar test:', similar)

            const skipped = similar.some(after)

            if (skipped) data.skipped = skipped
          }
        }
      }

      return data
    }

    const sections = course
      .sections
      .map(check)

    function cover ([give, take]) {
      const coverer = theirs.find(
        element => element.section === give
      )

      const covered = sections.find(
        element => element.name === take
      )

      if (covered) covered.done = coverer

      if (give === 'first practice feedback') {
        console.log('student test:', student)
        console.log('coverer test:', coverer)
      }
    }

    RELATIONS.map(cover)

    function not (section) {
      return !section.done
    }

    function focus (blocking = true) {
      function timing (section) {
        return section.blocking === blocking
      }

      const timed = sections.filter(timing)

      return timed.find(not)
    }

    const next = focus()
    next.next = true

    if (next.type === 'kickoff') {
      next.blocked = true
    } else {
      next.working = true
    }

    const ready = focus(false)

    const { index } = ready
    const before = sections.slice(0, index)

    const all = before
      .every(section => section.done)

    if (all) {
      ready.next = true
      ready.waiting = true
    }

    return { name: student, sections }
  }

  return students.map(track)
}
