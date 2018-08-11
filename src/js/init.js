import { Game } from './Game'
import { Renderer } from './Renderer'
import { start as startRunner } from './Runner'

window.addEventListener(
  'load',
  bootstrap,
  false
)

function bootstrap(e) {
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
