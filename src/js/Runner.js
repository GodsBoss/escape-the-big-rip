import { start as startLoop } from './Loop'

const TICKS_PER_SECOND = 25

class Runner {
  constructor(game, renderer) {
    this.game = game
    this.renderer = renderer
  }

  start() {
    startLoop(
      (next) => setTimeout(next, 1000 / TICKS_PER_SECOND),
      () => this.game.tick()
    )
    startLoop(
      (next) => requestAnimationFrame(next),
      () => this.renderer.render(this.game)
    )
  }
}

function start(game, renderer) {
  const runner = new Runner(game, renderer)
  runner.start()
  return runner
}

export { start, Runner }
