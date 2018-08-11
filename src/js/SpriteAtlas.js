class SpriteAtlas {
  constructor(sprites) {
    this.sprites = sprites
  }

  get(id, animationFrame) {
    const base = this.sprites[i]
    return {
      x: base.x + base.w * animationFrame,
      y: base.y,
      w: base.w,
      h: base.h
    }
  }

  all() {
    let list = []
    for(var type in this.sprites) {
      const curr = this.sprites[type]
      const frames = typeof curr.frames === 'number' ? curr.frames : 1
      for (let frame = 0; frame < frames; frame++) {
        list.push(
          {
            type: type,
            x: curr.x + curr.w * frame,
            y: curr.y,
            w: curr.w,
            h: curr.h,
            frame: frame,
          }
        )
      }
    }
    return list
  }
}

function defaultSpriteAtlas() {
  return new SpriteAtlas(sprites)
}

const sprites = {
  'bg-title': {
    x: 481,
    y: 0,
    w: 160,
    h: 100
  },
  'bg-playing': {
    x: 481,
    y: 102,
    w: 160,
    h: 100
  },
  'bg-game-over': {
    x: 481,
    y: 204,
    w: 160,
    h: 100
  }
}

export { defaultSpriteAtlas }
