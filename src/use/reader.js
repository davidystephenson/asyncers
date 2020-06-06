/* global fetch */

import { useState, useEffect } from 'react'

export default function useReader () {
  const [reports, setReports] = useState([])

  async function get (url) {
    const response = await fetch(url)
    const json = await response.json()

    return json
  }

  function parse (report) {
    function extract (key) {
      const value = report[key]

      if (typeof value === 'string') {
        return value.toLowerCase()
      }

      return value
    }

    const name = extract('whatIsYourName?')
    const number = extract('whichClassAreYouIn?')
    const section = extract(
      'whichPartOfTheReaderDidYouJustFinish?'
    )

    const epoch = Date.parse(report.timestamp)
    const date = new Date(epoch)
    const time = date.toISOString()

    return {
      date,
      epoch,
      id: report.id,
      name,
      class: number,
      section,
      time,
      timestamp: report.timestamp
    }
  }

  async function getReader () {
    const url = 'https://v2-api.sheety.co/f8d9905dd113821929ea3ad4e3f09c41/async/reader'

    const json = await get(url)

    const { reader } = json

    const parsed = reader.map(parse)

    setReports(parsed)
  }

  function effect () { getReader() }

  useEffect(effect, [])

  return { reports }
}
