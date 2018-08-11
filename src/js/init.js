import { Game } from './Game'
import { Renderer } from './Renderer'
import { Resizer, canvasResizeListener } from './Resizer'
import { start as startRunner } from './Runner'
import { defaultSpriteAtlas } from './SpriteAtlas'

window.addEventListener(
  'load',
  bootstrap,
  false
)

const WIDTH = 160
const HEIGHT = 100

function bootstrap(e) {
  const img = new Image()
  img.addEventListener(
    'load',
    init,
    false
  )
  img.src = "gfx.png"
}

function init(e) {
  const game = new Game()
  window.addEventListener(
    'keypress',
    (event) => game.pushEvent(event),
    false
  )
  const canvas = document.getElementById('gfx')
  const renderer = new Renderer(canvas, e.target, defaultSpriteAtlas())
  canvas.width = WIDTH
  canvas.height = HEIGHT
  const resizer = (new Resizer(window, { width: WIDTH, height: HEIGHT })).
    setMinimalFactor(1).
    setMargin(10, 10).
    addListener(canvasResizeListener(canvas)).
    addListener((factor) => renderer.setScale(factor))
  resizer.resize()
  startRunner(game, renderer)
}
