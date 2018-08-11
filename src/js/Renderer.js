class Renderer {
  constructor(canvas) {
    this.context = canvas.getContext('2d')
    this.scale = 1
  }

  setScale(factor) {
    this.scale = factor
  }

  render(game) {}
}

export { Renderer }
