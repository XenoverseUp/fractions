const importCSS = (path) => {
  document
    .getElementsByTagName("head")[0]
    .insertAdjacentHTML("beforeend", `<link rel="stylesheet" href="${path}" />`)
}

export default importCSS
