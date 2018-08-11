class Resizer {
  constructor(window, size) {
    this.window = window
    this.size = size
    this.listeners = []
  }

  setMargin(horizontal, vertical) {
    this.margin = {
      horizontal: horizontal,
      vertical: vertical
    }
    return this
  }

  setMinimalFactor(f) {
    this.minimalFactor = f
    return this
  }

  addListener(listener) {
    if (this.listeners.length == 0) {
      this.window.addEventListener('resize', () => this.resize(), false)
    }
    this.listeners.push(listener)
    return this
  }

  resize() {
    const hFactor = Math.max(1, Math.floor((this.window.innerWidth - this.margin.horizontal) / this.size.width))
    const vFactor = Math.max(1, Math.floor((this.window.innerHeight - this.margin.vertical) / this.size.height))
    const factor = Math.max(this.minimalFactor, Math.min(hFactor, vFactor))
    this.listeners.forEach((listener) => listener(factor))
  }
}

function canvasResizeListener(canvasElement) {
  const initialWidth = canvasElement.width
  const initialHeight = canvasElement.height
  return function(factor) {
    canvasElement.width = initialWidth * factor
    canvasElement.height = initialHeight * factor
  }
}

export { Resizer, canvasResizeListener }
