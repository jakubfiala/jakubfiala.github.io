const webpack = require('webpack');

module.exports = {
    entry: "./js/main.js",
    output: {
        path: __dirname,
        filename: "./js/dist/main.js"
    },
    devtool: 'cheap-module-source-map',
    module: {
        loaders: [
              {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel',
                    query: {
                        presets: ['latest']
                    }
              }
        ]
    },
    plugins: [
	new webpack.optimize.UglifyJsPlugin(),
        new webpack.BannerPlugin('---\n---\n', {
            raw: true
        })
    ]
}
