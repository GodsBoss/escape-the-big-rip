class Densities {
  constructor() {
    this.densitiesByType = {}
  }

  // add adds a density.
  //
  // progressFunc is a function which takes the current value and the amount of progress made.
  add(type, initialValue, progressFunc) {
    this.densitiesByType[type] = new Density(initialValue, progressFunc)
  }

  progress(amount) {
    for(var prop in this.densitiesByType) {
      this.densitiesByType[prop].progress(amount)
    }
  }

  current(type) {
    return this.densitiesByType[type].current()
  }
}

class Density {
  constructor(initialValue, progressFunc) {
    this.value = initialValue
    this.progressFunc = progressFunc
  }

  current() {
    return this.value
  }

  progress(amount) {
    this.value = this.progressFunc(this.value, amount)
  }
}

export {
  Densities
}
