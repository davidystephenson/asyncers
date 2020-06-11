import { useContext } from 'react'

import curriculum from '../lib/curriculum'
import report from '../lib/report'

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

        if (data.later) {
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

    return { name: student, sections }
  }

  return students.map(track)
}
