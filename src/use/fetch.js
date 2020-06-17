import { useState, useEffect } from 'react'
import hoping from 'hoping'

export default function useFetch (url) {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)

  async function get () {
    try {
      setLoading(true)

      const response = await hoping(url)

      const json = await response.json()

      if (!json) {
        console.warn('No json recevied from', url, json)
      }

      setData(json)

      setLoading(false)

      return json
    } catch (error) {
      console.error(error)
    }
  }

  function effect () {
    get()
  }

  useEffect(effect, [])

  return { data, get, loading, setData }
}
