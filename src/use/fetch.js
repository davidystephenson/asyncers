/* global fetch */

import { useState, useEffect } from 'react'

export default function useFetch (url) {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)

  async function wait (delay) {
    function time (resolve) {
      setTimeout(resolve, delay)
    }

    return new Promise(time)
  }

  async function retry (url, retries, delay) {
    await wait(delay)

    const newRetries = retries - 1
    const newDelay = delay * 2

    return getResponse(
      url, newRetries, newDelay
    )
  }

  async function getResponse (
    url, retries = 5, delay = 1000
  ) {
    const hopeful = retries > 0

    try {
      const response = await fetch(url)

      if (response.ok) return response

      const statuses = [
        408, 500, 502, 503, 504, 522, 524
      ]

      const valid = statuses
        .includes(response.status)

      if (hopeful && valid) {
        return retry(url, retries, delay)
      }

      throw Error(response.statusText)
    } catch (error) {
      if (hopeful) {
        return retry(url, retries, delay)
      }

      throw error
    }
  }

  async function get () {
    try {
      setLoading(true)

      const response = await getResponse(url)

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
