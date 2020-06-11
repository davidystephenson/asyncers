function extract (field) {
  const { enum_value: { name } } = field

  return name
}

export default function useAsana (
  json, format
) {
  const { data } = json

  function parse ({
    custom_fields: custom, name
  }) {
    const extracted = custom.map(extract)

    return format(name, extracted)
  }

  const parsed = data.map(parse)

  return parsed
}
