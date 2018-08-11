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
        y: 0
      }
    )
  },
  start: (game) => {
    game.data.currentScore = 0
  },
  tick: (game) => {
    game.data.currentScore++
  }
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

function byID(id) {
  return function(obj) {
    return obj.id === id
  }
}

export { Game }
