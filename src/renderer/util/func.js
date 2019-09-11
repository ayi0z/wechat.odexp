const DATE_FORMAT = (date, sp = '-') => {
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()

  return `${y}${sp}${m}${sp}${d}`
}

export default {
  DATE_FORMAT
}
