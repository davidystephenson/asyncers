function extract (field) {
  const { enum_value: { name } } = field

  return name
}

export default function useAsana (
  json, format
) {
  const { data } = json

  function parse (
    { custom_fields: custom, name }, index
  ) {
    const extracted = custom.map(extract)

    const formatted = format(name, extracted)

    formatted.index = index

    return formatted
  }

  const parsed = data.map(parse)

  return parsed
}
