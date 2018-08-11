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
    frames: 8
  },
  'ship-shield': {
    x: 0,
    y: 43,
    w: 5,
    h: 5,
    frames: 4
  },
  'star-big-a': {
    x: 0,
    y: 48,
    w: 3,
    h: 3
  },
  'star-big-b': {
    x: 3,
    y: 48,
    w: 3,
    h: 3
  },
  'star-big-c': {
    x: 6,
    y: 48,
    w: 3,
    h: 3
  },
  'star-big-d': {
    x: 9,
    y: 48,
    w: 3,
    h: 3
  },
  'star-big-e': {
    x: 12,
    y: 48,
    w: 3,
    h: 3
  },
  'star-big-f': {
    x: 15,
    y: 48,
    w: 3,
    h: 3
  },
  'star-big-g': {
    x: 18,
    y: 48,
    w: 3,
    h: 3
  },
  'star-small-a': {
    x: 0,
    y: 51,
    w: 3,
    h: 3
  },
  'star-small-b': {
    x: 3,
    y: 51,
    w: 3,
    h: 3
  },
  'star-small-c': {
    x: 6,
    y: 51,
    w: 3,
    h: 3
  },
  'star-small-d': {
    x: 9,
    y: 51,
    w: 3,
    h: 3
  },
  'star-small-e': {
    x: 12,
    y: 51,
    w: 3,
    h: 3
  },
  'star-small-f': {
    x: 15,
    y: 51,
    w: 3,
    h: 3
  },
  'star-small-g': {
    x: 18,
    y: 51,
    w: 3,
    h: 3
  },
  'neutron-star': {
    x: 0,
    y: 98,
    w: 9,
    h: 9,
    frames: 4
  },
  'red-giant': {
    x: 0,
    y: 107,
    w: 31,
    h: 31,
    frames: 3
  }
}

export { defaultSpriteAtlas }
