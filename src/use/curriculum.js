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
    return sections
      .filter(section => section.type === type)
  }

  const welcome = byType('welcome')
  const kickoff = byType('kickoff')
  const evaluation = byType('evaluation')
  const feedback = byType('feedback')
  const lecture = byType('lecture')
  const demo = byType('demo')
  const exercise = byType('exercise')
  const project = byType('project')
  const independent = byType('independent')

  const blocking = []
  const nonBlocking = []

  sections.forEach(section => section.blocking
    ? blocking.push(section)
    : nonBlocking.push(section)
  )

  return {
    sections,
    welcome,
    kickoff,
    evaluation,
    feedback,
    lecture,
    demo,
    exercise,
    project,
    independent,
    blocking,
    nonBlocking
  }
}
