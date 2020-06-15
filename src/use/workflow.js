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
  const [
    ,
    blocking,
    interruptible,
    teacher,
    lecturer
  ] = fields.map(parse)

  return {
    name,
    blocking,
    interruptible,
    teacher,
    lecturer
  }
}

export default function useWorkflow () {
  const rows = useAsana(workflow, format)

  function reduce (types, row) {
    types[row.name] = row

    return types
  }

  const types = rows.reduce(reduce, {})

  return { types }
}
