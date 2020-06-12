import { useContext } from 'react'

import curriculum from '../lib/curriculum'
import report from '../lib/report'

import useEvaluations from '../use/evaluations'

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

  const evaluations = useEvaluations()

  const combined = [...reports, ...evaluations]
    .sort((a, b) => a.date - b.date)

  function track (student) {
    const theirs = filter(
      'student', student, combined
    )

    function check (section, index) {
      const {
        name, blocking, retry, type
      } = section

      function after (element) {
        return element.index > index
      }

      const done = theirs.find(
        report => report.section === name
      )

      const data = { ...section, done }

      if (!done) {
        data.later = theirs.some(after)

        if (data.later && !retry) {
          if (blocking) data.ignored = true
          else {
            const similar = theirs.filter(
              report => report.type === type
            )

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
    }

    RELATIONS.map(cover)

    function not (section) {
      return !section.done
    }

    function focus (valid, array) {
      const timed = array.filter(valid)

      return timed.find(not)
    }

    function working (section) {
      const { blocking, retry } = section

      const time = blocking === true

      return time && !retry
    }

    const next = focus(working, sections)
    next.next = true

    if (next.type === 'kickoff') {
      next.blocked = true
    } else {
      next.working = true
    }

    function wait (target) {
      function waiting (section, index) {
        const { type, retry } = section
        const similar = type === target
        const match = similar && !retry

        return match
      }

      const focused = focus(waiting, sections)

      const index = sections.findIndex(
        element => element.name === focused.name
      )

      const before = sections.slice(0, index)

      function consider (section) {
        const { blocking, type } = section
        const similar = type === target

        if (blocking || similar) {
          return section.done
        }

        return true
      }

      const all = before.every(consider)

      if (all) {
        focused.next = true
        focused.waiting = true
      }
    }

    wait('feedback')
    wait('lecture')

    return { name: student, sections }
  }

  return students.map(track)
}
