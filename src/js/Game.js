class Game {
  constructor(eventQueue) {
    this.data = {}
    this.objects = {}
    this.nextState(TITLE)
    this.events = []
  }

  tick() {
    this.state.tick(this)
    this.events = []
  }

  nextState(state) {
    this.state = state
    this.state.init(this)
  }

  // getObjects returns all objects of the current state.
  //
  // @return array
  getObjects() {
    let objects = this.objects[this.state.id()]
    if (!objects) {
      objects = []
    }
    return objects
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
  init(game) {}
  tick(game) {}
  id() {}
}

// Shows title screen.
const TITLE = {
  id: () => "title",
  init: (game) => {
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

export { Game }
