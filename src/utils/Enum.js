function Enum(names) {
  let members = Object.create(null)

  members.tryParse = (name) => {
    if (!members[name]) {
      throw new Error(`Unable to parse '${name}' as an Enum member.`)
    }
    return members[name]
  }

  names.forEach((name) => (members[name] = Symbol(name)))

  return new Proxy(members, {
    get: (target, name) => {
      if (!members[name]) {
        throw new Error(`Member '${name}' not found on the Enum.`)
      }
      return members[name]
    },
    set: (target, name, value) => {
      throw new Error("Adding new members to Enums is not allowed.")
    },
  })
}

export default Enum
