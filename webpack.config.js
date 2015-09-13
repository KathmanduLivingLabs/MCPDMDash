var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './src/app.js'
  ],
  output: {
    path: __dirname + '/build',
    filename: 'app.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      { test: /\.js$/, loader: 'react-hot!babel', include: path.join(__dirname, 'src') },
      { test: /\.scss$/, loader: 'style!css!autoprefixer?browsers=last 2 version!sass' },
      { test: /\.woff$/, loader: 'url?limit=8192' },
      { test: /\.png$/, loader: 'url?limit=8192' },
      { test: /\.jpg$/, loader: 'url?limit=8192' },
      { test: /\.svg$/, loader: 'url?limit=8192' },
      { test: /\.html/, loader: 'file?name=[name].[ext]' },
      { test: /\.json/, loader: 'json' },
      { test: /\.geojson/, loader: 'json' }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  }
};
