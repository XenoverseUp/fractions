Date.prototype.monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

Date.prototype.getPreviousMonthName = function () {
  return this.monthNames[this.getMonth() === 0 ? 11 : this.getMonth() - 1]
}

Date.prototype.getAdjustedYear = function () {
  return this.getMonth() === 0 ? this.getFullYear() - 1 : this.getFullYear()
}
