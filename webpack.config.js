var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var node_modules = fs.readdirSync('node_modules');

var presets = 'presets[]=es2015,presets[]=react,presets[]=stage-0';

module.exports = {
    entry: [
        "./src/index.js"
    ],
    externals: node_modules,
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: "react-folderselect.js",
        library: 'react-folderselect',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel?'+presets],
                include: [path.resolve(__dirname, 'src')]
            }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ]
};