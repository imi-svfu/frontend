const CopyPlugin = require('copy-webpack-plugin')
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

module.exports = (env, argv) => {
  // Если продакшн-сборка тогда читаем URL к API из файла
  let api_url = 'http://localhost:8000'
  if (argv.mode === 'production') {
    try {
      api_url = fs.readFileSync('api_url.txt')
    } catch (e) {
      console.log('api_url.txt is missing!')
      process.exit(1)
    }
  }

  return {
    mode: argv.mode || 'development',
    entry: path.resolve(__dirname, 'src', 'main.jsx'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react'
          ]
        }
      }]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          API_URL: JSON.stringify(api_url)
        }
      }),
      new CopyPlugin({
        patterns: [
          {from: path.resolve(__dirname, 'src', 'index.html')},
          {from: path.resolve(__dirname, 'src', 'service-worker.js')}
        ]
      })
    ]
  }
}