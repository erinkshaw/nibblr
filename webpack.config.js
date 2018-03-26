const webpack = require('webpack')

module.exports = {
    entry: './src/index.jsx',
    output: {
      path: __dirname,
      filename: './public/bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.','.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015'],
            plugins: ["transform-object-rest-spread"]
          }
        }
      ]
    }
  };
