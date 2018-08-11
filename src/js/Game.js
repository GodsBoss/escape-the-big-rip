import { IntValue } from './IntValue'
import rand from './random'
import v from './vector'

class Game {
  constructor(eventQueue) {
    this.data = {}
    this.objects = {}
    this.nextState(TITLE)
    this.statesInitFinished = {}
    this.events = []
  }

  tick() {
    this.state.tick(this)
    this.events = []
  }

  nextState(state) {
    this.state = state
    if (typeof this.state.init === "function" && this.statesInitFinished !== true) {
      this.statesInitFinished = true
      this.state.init(this)
    }
    this.state.start(this)
  }

  // getObjects returns all objects of the current state.
  //
  // @return array
  getObjects() {
    if (!this.objects[this.state.id()]) {
      this.objects[this.state.id()] = []
    }
    return this.objects[this.state.id()]
  }

  setObjects(objects) {
    this.objects[this.state.id()] = objects
  }

  pushEvent(event) {
    this.events.push(event)
  }

  getEvents() {
    return this.events
  }
}

// Only for documentation purposes.
class State {
  // Optional
  init(game) {}
  start(game) {}
  tick(game) {}
  id() {}
}

// Shows title screen.
const TITLE = {
  id: () => "title",
  init: (game) => {
    game.getObjects().push(
      {
        type: "bg-title",
        x: 0,
        y: 0
      }
    )
  },
  start: (game) => {
    if (typeof game.data.highScore != "number") {
      game.data.highScore = 0
    }
  },
  tick: (game) => {
    game.getEvents().forEach(
      (event) => {
        if (event.type == "keypress" && event.key == " ") {
          game.nextState(PLAYING)
        }
      }
    )
  }
}

// Currently playing.
const PLAYING = {
  id: () => "playing",
  init: (game) => {
    game.getObjects().push(
      {
        type: "bg-playing",
        x: 0,
        y: 0,
        z: -100000,
        customSpeed: true
      }
    )
    game.getObjects().push(
      {
        type: "ship",
        x: 10,
        y: 50,
        offsetX: -6,
        offsetY: -6,
        xSpeed: 10,
        ySpeed: -10,
        space: new IntValue(4.5, 8, 0.1 / FPS),
        shield: new IntValue(4, 8, 0.1 / FPS)
      }
    )
  },
  start: (game) => {
    game.data.currentScore = 0
    game.data.density = 0.01
  },
  tick: (game) => {
    let objects =  game.getObjects()
    game.data.currentScore++
    const ship = objects.find(byType('ship'))

    game.getEvents().forEach(
      (event) => {
        if (event.type === 'keypress' && event.charCode === 32) {
          if (ship.space.getCurrent() >= 1) {
            ship.space.add(-1)
            ship.ySpeed *= -1
          }
        }
      }
    )

    const realXSpeed = ship.xSpeed / FPS
    const realYSpeed = ship.ySpeed / FPS
    objects.forEach(
      (obj) => {
        if (typeof obj.animation === 'number') {
          obj.animation += 0.1
        }
        if (obj.type != "ship" && !obj.shipAttached && !obj.customSpeed) {
          obj.x -= ship.xSpeed / FPS
          obj.y -= ship.ySpeed / FPS
        }
      }
    )

    ship.shield.tick()
    ship.space.tick()

    ensureShipOrbs(objects, 'ship-shield', ship.shield.getCurrent(), ship.x, ship.y)
    ensureShipOrbs(objects, 'ship-space', ship.space.getCurrent(), ship.x, ship.y)

    gatherAroundShip(ship, objects.filter(byTypes(['ship-shield', 'ship-space'])))

    objects.forEach(
      (obj) => {
        if (typeof obj.dx === 'number') {
          obj.x += obj.dx
        }
        if (typeof obj.dy === 'number') {
          obj.y += obj.dy
        }
      }
    )

    if (Math.random() < 0.1) {
      objects.push(randomStar())
    }

    moveByDepth(ship, objects)

    game.setObjects(
      objects.filter(
        (obj) => typeof obj.x !== 'number' || obj.x > -20
      )
    )

    game.data.density += 0.0001 / FPS

    let density = game.data.density
    if (Math.random() < density) {
      game.getObjects().push(
        {
          type: "red-dwarf",
          x: 175,
          y: rand.floatn(-100, 300),
          offsetX: -10,
          offsetY: -10,
          animation: 0
        }
      )
    }
  }
}

function randomStar() {
  const minDepth = 1
  const maxDepth = 3
  const starDepth = rand.floatn(minDepth, maxDepth)
  return {
    type: 'star-' + (starDepth > (maxDepth + minDepth) / 2 ? 'small' : 'big') + '-' + rand.char('abcdefg'),
    x: 160,
    y: rand.floatn(-100, 300),
    z: -1,
    depth: starDepth,
    customSpeed: true
  }
}

function moveByDepth(ship, objects) {
  objects.filter(
    (obj) => obj.customSpeed && typeof obj.depth === "number"
  ).forEach(
    (obj) => {
      obj.x -= ship.xSpeed / FPS / obj.depth
      obj.y -= ship.ySpeed / FPS / obj.depth
    }
  )
}

function ensureShipOrbs(objects, type, targetValue, x, y) {
  const orbs = objects.filter(byType(type))
  const add = targetValue - orbs.length
  const remove = -add
  for (var i = 0; i < add; i++) {
    const dv = v.randomDirection()
    objects.push(
      {
        type: type,
        x: x,
        y: y,
        dx: dv.x,
        dy: dv.y,
        offsetX: -2,
        offsetY: -2,
        animation: Math.random(),
        shipAttached: true
      }
    )
  }
  for (var i = 0; i < remove; i++) {
    let i = objects.findIndex(byType(type))
    removeObjectByIndex(objects, i)
    // TODO: Add fading effect.
  }
}

function gatherAroundShip(ship, orbs) {
  orbs.forEach(
    (orb) => {
      var d = {
        x: orb.dx,
        y: orb.dy
      }
      v.apply(v.scale(d, 0.95), d)
      v.apply(v.add(d, v.scale(v.randomDirection(), 1/FPS)), d)
      const diff = v.diff(ship, orb)
      if (v.length(diff) < 8) {
        v.apply(v.add(d, v.scale(v.normalize(diff), 5/FPS)), d)
      }
      if (v.length(diff) > 10) {
        v.apply(v.add(d, v.scale(v.normalize(diff), -5/FPS)), d)
      }
      orb.dx = d.x
      orb.dy = d.y
    }
  )
}

// Game over (player lost).
const GAME_OVER = {
  id: () => "game_over",
  init: (game) => {
    game.getObjects().push(
      {
        type: "bg-game-over",
        x: 0,
        y: 0
      }
    )
  },
  start: (game) => {
    game.data.highScore = Math.max(game.data.highScore, game.data.currentScore)
  },
  tick: (game) => {
    game.getEvents().forEach(
      (event) => {
        if (event.type == "keypress" && event.key == " ") {
          game.nextState(TITLE)
        }
      }
    )
  }
}

function byType(type) {
  return function(obj) {
    return obj.type === type
  }
}

function byTypes(types) {
  const m = {}
  types.forEach((type) => m[type] = true)
  return function(obj) {
    return !!m[obj.type]
  }
}

function byID(id) {
  return function(obj) {
    return obj.id === id
  }
}

function removeObjectByIndex(objects, index) {
  objects[index] = objects[objects.length - 1]
  objects.pop()
}

const FPS = 25

export { Game }
