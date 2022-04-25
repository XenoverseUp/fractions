function estimate(currentMonth, previousMonth = currentMonth) {
  const now = new Date()
  const day = now.getDate()

  var d = new Date(now.getFullYear(), now.getMonth() + 1, 0)
  monthDay = d.getDate()

  return currentMonth + (1 - (day - 1) / monthDay) * ((previousMonth + currentMonth) / 2)
}

export default estimate
