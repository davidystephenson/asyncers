import curriculum from '../curriculum.json'

import useAsana from '../use/asana'
import useWorkflow from '../use/workflow'

export default function useCurriculum () {
  const { types } = useWorkflow()

  function format (name, fields) {
    const [type] = fields

    const work = types
      .find(element => element.name === type)

    const { blocking } = work

    return { name, type, blocking }
  }

  const sections = useAsana(curriculum, format)

  function byType (type) {
    function mark (section, index) {
      const key = `${type}Index`

      return { ...section, [key]: index }
    }

    return sections
      .filter(section => section.type === type)
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
    section.blocking
      ? blocking.push(section)
      : nonBlocking.push(section)

    section.retry = section
      .name
      .includes('retry')
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
