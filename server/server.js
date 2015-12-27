// esversion: 6
'use strict';
module.exports = (io) => {
  
  var removeFunctions = (data) => {
    for(let key in data) {
      if(typeof data[key] === 'function' || key[0] === '_') {
        delete data[key];
      }
    }
  }
  var EventEmitter = require('event-emitter');
  class Client extends EventEmitter {
    constructor () {
      super();
      EventEmitter.call(this);
      
    }
    status () {
      
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          return resolve('online');
        }, 250);
        setTimeout(() => {
          this.emit('client:status');
        }, 1250);
      });
    }
    addTorrent (opts) {
      return new Promise((resolve, reject) => {
        let torrent = client.add(opts.source, (torrent) => {
          this.emit('torrent:' + torrent.infoHash + ':loaded', removeFunctions(torrent));
        });
        
        torrent.on('download', (chunkSize) => {
          this.emit('torrent:' + torrent.infoHash + ':download', chunkSize);
        })
      });
    }
  };
    
  io.on('connection', function(socket) {
    console.log('Client connected...');
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
      if(!callbackId) return console.err('Cliend was called, but no callbacc specified');
      
      client[payload.method](opts.args).then(function(res) {
        socket.emit('callback_done_'+opts.callbackId, res);
      }).catch(function (err) {
        socket.emit('callback_err_'+opts.callbackId, err);
      })
    });
});

}