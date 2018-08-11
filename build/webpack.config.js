const path = require('path')

const config = {
  "mode": "none",
  "entry": "./src/js/init.js",

  "output": {
    filename: "game.js",
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              require('@babel/plugin-proposal-export-default-from')
            ]
          }
        }
      }
    ]
  },
}

module.exports = config
