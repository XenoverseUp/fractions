import ascii from "bundle-text:a/text.ascii"

class ASCIIHandler {
  ascii = null

  constructor() {
    this.ascii = ascii
  }

  print = () => console.log(ascii)
}

export default ASCIIHandler
