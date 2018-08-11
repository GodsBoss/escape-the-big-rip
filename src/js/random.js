function char(str) {
  return str[intn(0, str.length - 1)]
}

function intn(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

function floatn(min, max) {
  return min + Math.random() * (max - min)
}

// intervals takes a list of numbers and treats them as borders of intervals.
// Returns the index of the border with which the selected interval begins.
function intervals(borders){
  const val = floatn(borders[0], borders[borders.length-1])
  for (var i = 0; i < borders.length-2; i++) {
    if (val < borders[i+1]) {
      return i
    }
  }
  return borders.length - 2
}

export default {
  char,
  floatn,
  intervals,
  intn
}
