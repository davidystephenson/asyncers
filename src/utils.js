export function hoursFromNow (date) {
  const then = date.getTime()
  const now = new Date().getTime()
  const epoch = now - then

  const seconds = epoch / 1000
  const minutes = seconds / 60
  const hours = minutes / 60

  return Math.floor(hours)
}
