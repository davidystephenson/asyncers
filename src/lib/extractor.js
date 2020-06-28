export default function extractor (object) {
  return function extract (key) {
    const value = object[key]

    if (typeof value === 'string') {
      const lower = value.toLowerCase()

      return lower
    }

    return value
  }
}
