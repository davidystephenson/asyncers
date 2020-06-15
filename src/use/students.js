import { useContext } from 'react'

import {
  curriculumContext, reportsContext
} from '../lib'
import { hoursFromNow } from '../lib/utils'

import useEvaluations from '../use/evaluations'

const RELATIONS = [
  ['installation instructions', 'prework'],
  ['graphql basics', 'apply typescript'],
  ['advanced jest', 'apply graphql'],
  ['react native basics', 'apply jest'],
  ['graphql subscriptions', 'apply react native']
]

function filter (key, value, array) {
  return array.filter(
    report => report[key] === value
  )
}

function notDone (section) {
  return !section.done
}

export default function useStudents () {
  const course = useContext(curriculumContext)
  const {
    reports, students
  } = useContext(reportsContext)

  const evaluations = useEvaluations()

  const combined = [...reports, ...evaluations]
    .sort((a, b) => a.date - b.date)

  function track (student) {
    const theirs = filter(
      'student', student, combined
    )

    function findReport (name) {
      return theirs
        .find(report => report.section === name)
    }

    function check (section, index) {
      const {
        name, first, retry, type
      } = section

      function after (element) {
        return element.index > index
      }

      const data = {
        ...section,
        index,
        section: name,
        student
      }

      const done = findReport(name)

      data.done = done

      if (name === 'portfolio evaluation') {
        const attempts = theirs
          .filter(
            report => report
              .name === 'portfolio evaluation'
          )

        const retry = attempts
          .some(attempt => attempt.retry)

        const passed = attempts
          .some(attempt => !attempt.retry)

        if (retry && !passed) data.done = null
      }

      if (!data.done) {
        data.later = theirs.some(after)

        if (retry) {
          const evaluation = retry && first
            ? findReport('first evaluation')
            : findReport('sectond evaluation')

          data.retried = evaluation && evaluation.retry
        }

        const need = retry ? data.retried : true

        if (need && data.later) {
          if (type.blocking) data.skipped = true
          else {
            const similar = theirs.filter(
              report => report.type.name === type.name
            )

            const skipped = similar.some(after)

            data.skipped = skipped
          }
        }
      }

      return data
    }

    const sections = course
      .sections
      .map(check)

    console.log('sections test:', JSON.stringify(sections, null, 2))

    const useful = sections
      .filter(section => {
        const { retry, retried } = section

        return retry ? retried : true
      })

    function cover ([give, take]) {
      const coverer = theirs.find(
        element => element.section === give
      )

      const covered = sections.find(
        element => element.name === take
      )

      if (covered) {
        // TODO use report
        covered.done = coverer

        covered.skipped = false
      }
    }

    RELATIONS.forEach(cover)

    function focus (test) {
      const valid = useful.filter(test)

      const index = valid.findIndex(notDone)

      if (index < 0) {
        return null
      }

      const didnt = valid[index]

      if (didnt) {
        console.log('didnt test:', didnt)

        const backup = theirs
          .find(report => report.section === didnt.name)

        console.log('theirs test:', theirs)

        console.log('backup test:', backup)
      }

      if (index === 0) {
        const before = useful
          .slice(0, didnt.index)

        const consider = function consider (
          section
        ) {
          const {
            done, type: { name, blocking }
          } = section
          const similar = name === didnt.type.name
          const need = blocking || similar

          if (done && need) {
            return section
          }
        }

        const last = before.find(consider)

        if (last) {
          didnt.since = last.done.date
        } else {
          didnt.since = new Date()
        }
      } else {
        console.log('index test:', index)
        const since = valid[index - 1]
        console.log('since test:', since)
        didnt.since = since.done.date
      }

      didnt.hours = hoursFromNow(didnt.since)

      return didnt
    }

    function working (section) {
      const {
        skipped, type: { blocking }
      } = section

      const valid = blocking && !skipped

      return valid
    }

    const next = focus(working)

    if (next) {
      next.next = true

      if (next.type.teacher) {
        next.blocked = true
      } else {
        next.working = true
      }
    }

    function wait (target) {
      function waiting (section, index) {
        const { type: { name }, retry } = section
        const similar = name === target
        const match = similar && !retry

        return match
      }

      const focused = focus(waiting)

      if (!focused) {
        return null
      }

      console.log('focused test:', focused)

      const index = useful.findIndex(
        element => element.name === focused.name
      )

      const relation = RELATIONS
        .find(relation => relation[0] === focused.name)

      console.log('relation test:', relation)

      console.log('index test:', index)

      const before = useful.slice(0, index)

      function consider (section) {
        const { type, name } = section
        const similar = type.name === target

        if (type.blocking || similar) {
          if (relation) {
            const related = name !== relation[1]

            if (related) {
              return true
            }
          }

          return section.done
        }

        return true
      }

      function reject (section) {
        return !consider(section)
      }

      const rejected = before.find(reject)

      console.log('rejected test:', rejected)

      const all = before.every(consider)

      console.log('all test:', all)

      if (all) {
        focused.next = true
        focused.waiting = true
      }
    }

    wait('lecture')

    return { name: student, sections }
  }

  return students.map(track)
}
