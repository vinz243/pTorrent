import socketio from 'socket.io-client';
import EventEmitter from 'event-emitter';

const io = socketio(4200);
var gid = () => {
  return Math.floor(Math.random() * 1e9).toString(16);
}
class SocketClient {
  constructor() {

  }
  // Registers an event
  listen(event, torrentId, callback) {
    let id = gid();
    io.on('event_' + id, callback || torrentId$);
    
    return io.emit('listen', {
      event: event,
      scope: callback ? 'torrent' : 'client',
      id: id,
      torrentId: callback ? torrentId : undefined
    });
  }
}

const ProxiedSocketClient = new Proxy(SocketClient.prototype, {
  get: (receiver, prop) => {
    return (opts) => {
      let callbackId = gid();
      return new Promise((resolve, reject) => {

        // Create listeners to fullfill promise
        io.on('callback_done_' + callbackId, (data) => {
          resolve(data);
        });
        io.on('callback_err_' + callbackId, (err) => {
          reject(err);
        });

        // Call the server
        io.emit('client call', {
          callbackId: callbackId,
          opts: opts,
          method: prop
        });
      });
    };
  }
});

export default ProxiedSocketClient;