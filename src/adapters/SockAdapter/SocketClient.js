import socketio from 'socket.io-client';
import {EventEmitter} from 'events';

var gid = () => {
  return Math.floor(Math.random() * 1e9).toString(16);
}


class SocketClient extends EventEmitter{
  constructor() {
    super();
    EventEmitter.call(this);
    this._connected = false;
    this._socket = socketio({path: '/client'});
    this._socket.on('connect', () => {
        this._connected = true;
        this.emit('socketConnection');
    });
    this._socket.on('disconnect', () => {
      this._connected = false;
      this.emit('socketDisconnection');
    });
  }
  // Registers an event
  listen(event, torrentId, callback) {
    let id = gid();
    this._socket.on('event_' + id, callback || torrentId);
    
    return this._socket.emit('listen', {
      event: event,
      scope: callback ? 'torrent' : 'client',
      id: id,
      torrentId: callback ? torrentId : undefined
    });
  }
  connect() {
    return new Promise((resolve, reject) => {
      if(this._connected)
        return resolve();
      this.once('socketConnection', () => {
        resolve();
      });
    });
  }
}

class FProxy {
  constructor (target, handler) {
    let methods = ['status', 'addTorrent', 'getTorrentStatus'];
    methods.forEach((method) => {
      target.prototype[method] = handler.get(target, method);
    });
  }
}

const ProxiedSocketClient = new FProxy(SocketClient, {
  get: (receiver, prop) => {
    return function (opts) {
      let callbackId = gid();
      return new Promise((resolve, reject) => {

        // Create listeners to fullfill promise
        this._socket.on('callback_done_' + callbackId, (data) => {
          console.log('done', data);
          resolve(data);
        });
        this._socket.on('callback_err_' + callbackId, (err) => {
          reject(err);
        });

        // Call the server
        this._socket.emit('client call', {
          callbackId: callbackId,
          args: opts,
          method: prop
        });
      });
    };
  }
});
const INSTANCE = new SocketClient();
SocketClient.getInstance = () => {
  return INSTANCE;
}
export default SocketClient;
