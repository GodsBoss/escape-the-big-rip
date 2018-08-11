class IntValue {
  constructor(current, max, growth) {
    this.current = current
    this.max = max
    this.growth = growth
  }

  tick() {
    this.add(this.growth)
  }

  add(growth) {
    this.current = Math.min(this.max, this.current + growth)
  }

  // getCurrent returns the current value floored to an int.
  getCurrent() {
    return Math.floor(this.current)
  }
}

export {
  IntValue
}
