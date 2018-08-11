// cutOut cuts out a part of an image.
function cutOut(image, x, y, width, height) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  context.clearRect(0, 0, width, height)
  context.drawImage(image, x, y, width, height, 0, 0, width, height)
  return canvas
}

// scale takes an image (<canvas> or <img>) and returns a scaled copy.
function scale(image, factor) {
  const canvas = document.createElement('canvas')
  canvas.width = image.width * factor
  canvas.height = image.height * factor
  const context = canvas.getContext('2d')
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.drawImage(image, 0, 0)
  if (factor == 1) { // Nothing to do, early return
    return canvas
  }
  const srcImageData = context.getImageData(0, 0, image.width, image.height)
  const destImageData = context.createImageData(canvas.width, canvas.height)
  for (let srcX = 0; srcX < image.width; srcX++) {
    for (let srcY = 0; srcY < image.height; srcY++) {
      let srcBaseIndex = 4 * (srcX + (srcY * image.width))
      for (let xOffset = 0; xOffset < factor; xOffset++) {
        for (let yOffset = 0; yOffset < factor; yOffset++) {
          let destX = srcX * factor + xOffset
          let destY = srcY * factor + yOffset
          let destBaseIndex = 4 * (destX + (destY * canvas.width))
          for (let colorOffset = 0; colorOffset < 4; colorOffset++) {
            destImageData.data[destBaseIndex+colorOffset] = srcImageData.data[srcBaseIndex+colorOffset]
          }
        }
      }
    }
  }
  context.putImageData(destImageData, 0, 0)
  return canvas
}

export { cutOut, scale }
