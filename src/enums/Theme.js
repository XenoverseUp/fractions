import Enum from "_/Enum"

const Theme = Enum(["LIGHT", "DARK"])

export const negate = theme => (theme === Theme.DARK ? Theme.LIGHT : Theme.DARK)

export default Theme
