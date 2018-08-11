class SpriteAtlas {
  constructor(sprites) {
    this.sprites = sprites
  }

  get(id) {
    const base = this.sprites[id]
    return {
      frames: typeof base.frames === 'number' ? base.frames : 1
    }
  }

  all() {
    let list = []
    for(var type in this.sprites) {
      const curr = this.sprites[type]
      const frames = typeof curr.frames === 'number' ? curr.frames : 1
      for (var frame = 0; frame < frames; frame++) {
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
  },
  'ship': {
    x: 0,
    y: 0,
    w: 13,
    h: 13
  },
  'red-dwarf': {
    x: 0,
    y: 17,
    w: 21,
    h: 21,
    frames: 4
  },
  'ship-space': {
    x: 0,
    y: 38,
    w: 5,
    h: 5,
    frames: 4
  },
  'ship-shield': {
    x: 0,
    y: 43,
    w: 5,
    h: 5,
    frames: 4
  }
}

export { defaultSpriteAtlas }
