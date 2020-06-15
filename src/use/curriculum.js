import curriculum from '../curriculum.json'

import useAsana from './asana'
import useWorkflow from './workflow'

export default function useCurriculum () {
  const { types } = useWorkflow()

  function format (name, fields) {
    const [key] = fields

    const type = types[key]

    return { name, type }
  }

  const sections = useAsana(curriculum, format)

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

  function parse (section) {
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
