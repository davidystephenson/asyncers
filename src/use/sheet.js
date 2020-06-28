import useFetch from './fetch'

export default function useSheet (tab) {
  const SHEET = 'https://v2-api.sheety.co/f8d9905dd113821929ea3ad4e3f09c41/asyncers'

  const url = `${SHEET}/${tab}`

  const fetched = useFetch(url)

  return fetched
}
