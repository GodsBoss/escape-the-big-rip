function add(v1, v2) {
  return {
    x: v1.x + v2.x,
    y: v1.y + v2.y
  }
}

// apply sets the coordinates of target to those of source.
function apply(source, target) {
  target.x = source.x
  target.y = source.y
}

function diff(reference, other) {
  return add(scale(reference, -1), other)
}

function length(vector) {
  return Math.sqrt(vector.x * vector.x + vector.y * vector.y)
}

function normalize(vector) {
  const l = length(vector)
  if (l == 0) {
    return vector
  }
  return scale(vector, 1/l)
}

function randomDirection() {
  const angle = Math.random() * 2 * Math.PI
  return {
    x: Math.sin(angle),
    y: Math.cos(angle)
  }
}

function scale(vector, factor) {
  return {
    x: vector.x * factor,
    y: vector.y * factor
  }
}

export default {
  add,
  apply,
  diff,
  length,
  normalize,
  randomDirection,
  scale
}
