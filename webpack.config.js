var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var cssnext = require('postcss-cssnext');
var nested = require('postcss-nested');
var doiuse = require('doiuse');
var wordwrap = require('wordwrap');

var colors = require('colors');

var postCSSConfig = function(webpack) {
    return [
        nested,
        cssnext(),
        doiuse({
            onFeatureUsage: function(info) {
                var source = info.usage.source;
                // file is whole require path, joined with !'s.. we want the last part
                var sourceFile = path.relative('.', source.input.file.split('!').pop())
                var sourceLine = sourceFile + ':' + source.start.line;
                // take out location info in message itself
                var message = info.message.split(': ').slice(1).join(': ')
                console.log('[doiuse]'.red + ' ' + sourceLine + ': ' + info.featureData.title + '\n');
                console.log(wordwrap(4, process.stdout.columns - 1)(message) + '\n');
            }
        }),
    ];
};

module.exports = {
    entry: {
        app: ['./src/js/app.js']
    },
    output: {
        path: require('path').resolve('build'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.(woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=5000&mimetype=application/font-woff"
            },
            {test: /\.ttf(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"},
            {test: /\.eot(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"},
            {test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"},
            {test: /\.gif$/, loader: "file-loader"},
            {test: /\.png$/, loader: "file-loader"},
            {test: /\.jpg$/, loader: "file-loader"},
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css!postcss'),
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.handlebars.html$/,
                loader: "handlebars-loader"
            }
        ]
    },
    postcss: postCSSConfig,
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ],
};
