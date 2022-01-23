const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

module.exports = (env, argv) => {
  let apiUrl = 'http://localhost:8000';
  let outputPath = path.resolve(__dirname, 'dist');

  // Если продакшн-сборка тогда читаем URL к API из файла
  if (argv.mode === 'production') {
    try {
      apiUrl = fs.readFileSync('apiUrl').toString();
    } catch (e) {
      console.log('apiUrl is missing!'); // eslint-disable-line no-console
      process.exit(1);
    }

    outputPath = path.resolve(__dirname, 'docs');
  }

  const staticFiles = ['index.html', 'favicon.ico', 'service-worker.js'];
  const staticPatterns = staticFiles.map((f) => ({ from: path.resolve(__dirname, 'src', f) }));

  return {
    mode: argv.mode || 'development',
    entry: path.resolve(__dirname, 'src', 'main.jsx'),
    devServer: {
      historyApiFallback: {
        index: 'dist/index.html',
      },
    },
    output: {
      path: outputPath,
      filename: 'bundle.js',
    },
    module: {
      rules: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        resolve: { extensions: ['.js', '.jsx'] },
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
          ],
        },
      }],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          API_URL: JSON.stringify(apiUrl),
        },
      }),
      new CopyPlugin({
        patterns: staticPatterns,
      }),
    ],
  };
};
