import curriculum from '../curriculum.json'

export default function useCurriculum () {
  const { data } = curriculum

  function parse ({ custom_fields: custom, name }) {
    const [{ enum_value: { name: type } }] = custom

    return { name, type }
  }

  const sections = data.map(parse)

  return { sections }
}
