'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin  = require('mini-css-extract-plugin')
const Config = require('../config')

const utils = require('./utils')

let entries = []

if (Config.babel.use && Config.babel.polyfill) {
  entries.push('@babel/polyfill')
}

entries.push('./src/main.js')

const createBabel= () => ({
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
        main: entries
  },
  output: {
        path: Config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[hash].js'),
        chunkFilename: utils.assetsPath('js/[name].[hash].js'),
        publicPath: process.env.TARGET_ENV !== 'local' ?
            Config.build.assetsPublicPath : Config.dev.assetsPublicPath
  },   
  resolve: {
		extensions: ['.mjs', '.js', '.svelte'],
    alias: {
      'assets': utils.resolve('assets')
    }
  },

  module: { 
    rules: [
      ...(Config.babel.use ? [createBabel()] : []),      
			{
				test: /\.svelte$/,
				exclude: /node_modules/,
				use: {
					loader: 'svelte-loader',
					options: {
						emitCss: true,
						hotReload: true
					}
				}
      },     
      {
        test: /\.scss?$/,
        use: [
          'style-loader',          
          'css-loader',
          'sass-loader'
        ]
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: Config.build.assetsLimit,
            name: utils.assetsPath('img/[name].[hash:7].[ext]')
          }
        }
      }, {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: Config.build.assetsLimit,
            name: utils.assetsPath('media/[name].[hash:7].[ext]')
          }
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: Config.build.assetsLimit,
            name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
          }
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new CopyWebpackPlugin([{
      from: utils.resolve('static/'),
      to: Config.build.assetsRoot + '/' + Config.build.assetsSubDirectory + '/',
      toType: 'dir'
    }]),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    })
  ]
}
