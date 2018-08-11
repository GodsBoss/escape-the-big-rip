import { Game } from './Game'
import { Renderer } from './Renderer'
import { Resizer, canvasResizeListener } from './Resizer'
import { start as startRunner } from './Runner'

window.addEventListener(
  'load',
  bootstrap,
  false
)

const WIDTH = 160
const HEIGHT = 100

function bootstrap(e) {
  const canvas = document.getElementById('gfx')
  canvas.width = WIDTH
  canvas.height = HEIGHT
  const resizer = (new Resizer(window, { width: WIDTH, height: HEIGHT })).
    setMinimalFactor(2).
    setMargin(10, 10).
    addListener(canvasResizeListener(canvas))
  resizer.resize()
  const img = new Image()
  img.addEventListener(
    'load',
    init(img),
    false
  )
  img.src = "gfx.png"
}

function init(image) {
  return function(e) {
    startRunner(new Game(), new Renderer())
  }
}
