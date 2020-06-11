import workflow from '../workflow.json'

import useAsana from '../use/asana'

function parse (field) {
  switch (field) {
    case 'yes': return true
    case 'no': return false
    default: return null
  }
}

function format (name, fields) {
  const [, block, interrupt] = fields

  const blocking = parse(block)
  const interruptible = parse(interrupt)

  return { name, blocking, interruptible }
}

export default function useWorkflow () {
  const types = useAsana(workflow, format)

  return { types }
}
