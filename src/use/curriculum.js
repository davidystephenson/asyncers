import extractor from '../lib/extractor'

import useWorkflow from './workflow'
import useSheet from './sheet'

export default function useCurriculum () {
  const { types } = useWorkflow()

  const response = useSheet('curriculum')

  const { data: { curriculum } } = response

  let sections = curriculum || []

  if (sections.length) {
    const keys = Object.keys(sections[0])

    sections = sections.map(section => {
      const extract = extractor(section)

      const copy = {}

      keys.forEach(key => {
        copy[key] = extract(key)
      })

      copy.type = types[section.type]

      return copy
    })
  }

  function byType (type) {
    function mark (section, index) {
      const key = `${type}Index`

      return { ...section, [key]: index }
    }

    return sections
      .filter(section => section.type.name === type)
      .map(mark)
  }

  const welcomes = byType('welcome')
  const kickoffs = byType('kickoff')
  const evaluations = byType('evaluation')
  const feedbacks = byType('feedback')
  const lectures = byType('lecture')
  const demos = byType('demo')
  const exercises = byType('exercise')
  const projects = byType('project')
  const independents = byType('independent')

  const blocking = []
  const nonBlocking = []

  const parse = function parse (section) {
    section.type.blocking
      ? blocking.push(section)
      : nonBlocking.push(section)

    function includes (text) {
      return section.name.includes(text)
    }

    section.retry = includes('retry')

    if (section.retry) {
      section.first = includes('first')
    }
  }

  sections.forEach(parse)

  return {
    sections,
    welcomes,
    kickoffs,
    evaluations,
    feedbacks,
    lectures,
    demos,
    exercises,
    projects,
    independents,
    blocking,
    nonBlocking
  }
}
