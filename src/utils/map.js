const map = (value, start, end, mapStart, mapEnd) =>
  ((value - start) * (mapEnd - mapStart)) / (end - start) + mapStart

export default map
