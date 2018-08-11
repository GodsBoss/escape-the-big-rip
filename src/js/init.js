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
  }
}
