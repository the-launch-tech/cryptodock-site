const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const Webpack = require('webpack')

const nodeModules = {}
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
    publicPath: '/',
  },
  target: 'node',
  externals: nodeModules,
  plugins: [new Webpack.HotModuleReplacementPlugin()],
  module: {
    rules: [
      {
        test: /.(js)$/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
}
