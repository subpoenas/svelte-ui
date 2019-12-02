'use strict'
require('./check-versions')()

console.log("#########################################");
console.log("##                                      #");
console.log("##   @@@    @    @  @@  @@     @@@      #");
console.log("##   @   @  @    @      @@     @  @@    #");
console.log("##   @   @  @    @  @@  @@     @    @   #");
console.log("##   @@@    @    @  @@  @@     @    @   #");
console.log("##   @   @  @    @  @@  @@     @    @   #");
console.log("##   @   @  @    @  @@  @@     @  @@    #");
console.log("##   @@@      @@    @@  @@@@@  @@@      #");
console.log("##                                      #");
console.log("#########################################");

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const fs = require('fs');
const config = require('../config')
var webpackConfigName = './webpack.config'

// make webpack configs
if (process.env.TARGET_ENV == 'development') {
    webpackConfigName += '.dev'
} else if (process.env.TARGET_ENV == 'stage') {
    webpackConfigName += '.stg'
} else {
    webpackConfigName += '.prd'
}

webpackConfigName += '.js'

console.log('webpackConfig Name '+webpackConfigName)

const webpackConfig = require(webpackConfigName)


// 빌드 진행 상황 출력
console.log('building for ' + process.env.TARGET_ENV + ' since ' + convertDate())
const spinner = ora('building...')
spinner.start()

function convertDate () {
    return new Date().toJSON().slice(0,10) 
        + " " + new Date(new Date()).toString().split(' ')[4];
}

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) throw err
    webpack(webpackConfig, (err, stats) => {
        spinner.stop()
        if (err) throw err
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        if (stats.hasErrors()) {
            console.log(chalk.red('  Build failed with errors.\n'))
            process.exit(1)
        }

        console.log(chalk.cyan('  Build complete.\n'))
        console.log(chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
            '  Opening index.html over file:// won\'t work.\n'
        ))
    })
})