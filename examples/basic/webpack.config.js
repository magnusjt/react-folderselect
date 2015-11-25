var path = require('path');
var webpack = require('webpack');

var presets = 'presets[]=es2015,presets[]=react,presets[]=stage-0';

module.exports = {
    entry: [
        "./index.js"
    ],
    devtool: 'source-map',
    output: {
        path: __dirname,
        filename: "index.bundle.js"
    },
    resolve: {
        alias: {
            react: path.resolve('./node_modules/react') // Stops react from being included twice
        },
        root: __dirname
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel?'+presets],
                include: [path.resolve(__dirname, 'index.js'), path.resolve(__dirname, '../../src')]
            }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ]
};