var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('./webpack.config');

// Webpack server for hot module updates

var server = new WebpackDevServer(webpack(config), {
  contentBase: './build',
  noInfo: true,
  hot: true,
  stats: { colors: true }
});

// Start server

server.listen(8080, '0.0.0.0', function (err, result) {
  if (err) { console.log(err); }
  console.log('Listening at localhost:8080');
});
