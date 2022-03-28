const h = (html) => {
  var template = document.createElement("template")
  html = html.trim()
  template.innerHTML = html
  return template.content.firstChild
}

export default h
