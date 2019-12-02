'use strict'

const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const MiniCssExtractPlugin  = require('mini-css-extract-plugin')
module.exports = merge(baseConfig, {
  mode: 'production',
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
  },
  module: {
    rules: [    
      {
        test: /\.css?$/,
        use: [
          MiniCssExtractPlugin.loader
        ]
      }, {
        test: /\.styl(us)?$/,
        use: [
          MiniCssExtractPlugin.loader
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css'
    })
  ]
})
