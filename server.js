/*eslint no-console:0 */
require('core-js/fn/object/assign');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var open = require('open');


var devServer = new WebpackDevServer(webpack(config), config.devServer);
var io = require('socket.io')(devServer.listeningApp, {path: '/client'});
var server = require('./server/server.js')(io);

devServer.listen(config.port, process.env.IP || '127.0.0.1', function(err) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at ' + (process.env.IP || '127.0.0.1') + ':'+ config.port);
  console.log('Opening your system browser...');
  open('http://' + (process.env.IP || '127.0.0.1') + ':' + config.port + '/webpack-dev-server/');
});
