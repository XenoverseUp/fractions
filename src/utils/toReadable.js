const toReadable = (seconds) => {
  if (seconds < 60) return `${seconds} sec`
  if (seconds < 60 * 60) {
    const rem = seconds % 60
    if (rem === 0) return `${seconds / 60} min`
    else return `${Math.floor(seconds / 60)} min ${rem} sec`
  }

  const rem = (seconds % 60) * 60

  if (rem === 0) return `${seconds / (60 * 60)} hr`
  else return `${Math.floor(seconds / (60 * 60))} hr ${rem} min`
}

export default toReadable
