function char(str) {
  return str[intn(0, str.length - 1)]
}

function intn(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

function floatn(min, max) {
  return min + Math.random() * (max - min + 1)
}

export default {
  char,
  floatn,
  intn
}
