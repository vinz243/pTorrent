// esversion: 6
'use strict';

const Client = require('./client');
var PrettyError = require('pretty-error');
var pe = new PrettyError();

module.exports = (io) => {
   
    
  io.on('connection', function(socket) {
    let client = new Client();
    socket.on('get methods', () => {
      socket.emit('methods', Object.keys(Client.prototype).filter((key) => {
        return typeof Client.prototype[key] === 'function';
      }));
    });
    socket.on('listen', (payload) => {
      if(payload.scope === 'client') {
        client.on('client:' + payload.event, (data) => {
          socket.emit('event_' + payload.id, data);
        });
        
      } else if (payload.scope === 'torrent') {
        client.on('torrent:' + payload.torrentId + ':' + payload.event, (data) => {
          socket.emit('event_' + payload.id, data);
        });
      } else {
        console.err('We don\'t know which scope is ' + payload.scope);
      }
    });
    socket.on('client call', function(payload) {
      let callbackId = payload.callbackId;
      if(!callbackId) return console.err('Cliend was called, but no callback specified');
      client[payload.method](payload.args).then(function(res) {
        socket.emit('callback_done_' + payload.callbackId, res);
      }).catch(function (err) {
        console.log('error occured for ' + payload.method);
        console.log(pe.render(err));
        socket.emit('callback_err_' + payload.callbackId, err);
      })
    });
});

}