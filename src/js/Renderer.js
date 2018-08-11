import { cutOut, scale } from './graphics'

class Renderer {
  constructor(canvas, srcImage, atlas) {
    this.context = canvas.getContext('2d')
    this.atlas = atlas
    this.scale = 1

    // Keys are scale (with 1 being unscaled, hence used as base for scaling).
    // Values are maps from key, generated from id and animation frame, to image.
    this.prescaled = {}

    this.prescaleFactorOne(srcImage)
  }

  prescaleFactorOne(image) {
    this.prescaled['1'] = {}

    this.atlas.all().forEach(
      (spriteInfo) => {
        this.prescaled['1'][spriteInfo.type + '_' + spriteInfo.frame] = cutOut(image, spriteInfo.x, spriteInfo.y, spriteInfo.w, spriteInfo.h)
      }
    )
  }

  prescale(factor) {
    const prescaleKey = '' + factor
    if (this.prescaled[prescaleKey]) { // Images for that scale factor already created.
      return
    }
    this.prescaled[prescaleKey] = {}
    this.atlas.all().forEach(
      (spriteInfo) => {
        this.prescaled[prescaleKey][spriteInfo.type + '_' + spriteInfo.frame] = scale(this.prescaled['1'][spriteInfo.type + '_' + spriteInfo.frame], factor)
      }
    )
  }

  setScale(factor) {
    this.scale = factor
    this.prescale(factor)
  }

  render(game) {
    this.context.fillStye = '#000000'
    this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height)
    const sprites = game.getObjects().map(toSprite)
    sprites.sort(
      (first, second) => first.z - second.z
    )
    sprites.forEach(
      (sprite) => {
        this.context.drawImage(this.prescaled['' + this.scale][sprite.type + '_' + sprite.frame], Math.floor(this.scale * sprite.x), Math.floor(this.scale * sprite.y))
      }
    )
  }
}

// key returns a cache key.
function key(type, frame) {
  return type + '_' + frame
}

function toImageDataIndex(x, y, w, h, offset) {
  return 4*(x + y * w) + offset
}

function toSprite(obj) {
  return {
    type: obj.type,
    frame: typeof obj.frame === "number" ? obj.frame : 0,
    x: obj.x + (typeof obj.offsetX === "number" ? obj.offsetX : 0),
    y: obj.y + (typeof obj.offsetY === "number" ? obj.offsetY : 0),
    z: typeof obj.z === "number" ? obj.z : 0
  }
}

export { Renderer }
