import socketio from 'socket.io-client';
import {EventEmitter} from 'events';

var socket = socketio({path: '/client'});

var gid = () => {
  return Math.floor(Math.random() * 1e9).toString(16);
}
class SocketClient {
  constructor() {

  }
  // Registers an event
  listen(event, torrentId, callback) {
    let id = gid();
    socket.on('event_' + id, callback || torrentId);
    
    return socket.emit('listen', {
      event: event,
      scope: callback ? 'torrent' : 'client',
      id: id,
      torrentId: callback ? torrentId : undefined
    });
  }
}
socket.on('connect', () => {
  console.log('connect');
  socket.emit('handcheck');
})
class FProxy {
  constructor (target, handler) {
    let methods = ['status', 'addTorrent'];
    methods.forEach((method) => {
      target.prototype[method] = handler.get(target, method);
    });
  }
}

const ProxiedSocketClient = new FProxy(SocketClient, {
  get: (receiver, prop) => {
    return (opts) => {
      let callbackId = gid();
      return new Promise((resolve, reject) => {

        // Create listeners to fullfill promise
        socket.on('callback_done_' + callbackId, (data) => {
          resolve(data);
        });
        socket.on('callback_err_' + callbackId, (err) => {
          reject(err);
        });

        // Call the server
        socket.emit('client call', {
          callbackId: callbackId,
          opts: opts,
          method: prop
        });
      });
    };
  }
});

export default SocketClient;