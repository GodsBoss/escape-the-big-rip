class Loop {
  constructor(repeat, action) {
    this.repeat = repeat
    this.action = action
  }

  start () {
    this.step()
  }

  step () {
    this.repeat(
      () => this.step()
    )
    this.action()
  }
}

function start(repeat, action) {
  const loop = new Loop(repeat, action)
  loop.start()
  return loop
}

export { start, Loop }
