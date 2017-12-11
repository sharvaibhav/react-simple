/*
    ./webpack.config.js
*/
const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  devtool: 'source-map',
  devServer : {
    contentBase: __dirname + '/src',
  },
  module: {
    loaders: [
        {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
        },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
        { test: /\.(woff|woff2)$/, loader:"url-loader?prefix=font/&limit=5000" },
        { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
        { test: /\.json$/, loader: 'json-loader'},
        { test: /\.(png|jp(e*)g|svg)$/,use: [{loader: 'url-loader',options: { limit: 8000, name: 'images/[hash]-[name].[ext]'} }]},
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }
}