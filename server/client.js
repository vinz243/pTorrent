
'use strict';

const EventEmitter = require('events').EventEmitter;
const WebTorrent = require('webtorrent');
const _ = require('lodash');
var PrettyError = require('pretty-error');
var pe = new PrettyError();


let wtClient = new WebTorrent();


var normalize = (data) => {
  let obj = {};
  for(let key in data) {
    if(typeof data[key] !== 'function' && key[0] !== '_' && typeof data[key] !== 'object')
      obj[key] = data[key];
  }
  return obj;
};

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
        try {
          let torrent = wtClient.add(opts.source, (torrent) => {
          var nled = normalize(torrent);
//             this.emit('torrent:' + torrent.infoHash + ':loaded', nled);
            resolve(nled);
          });
          
          torrent.on('download', _.throttle((chunkSize) => {
            this.emit('torrent:' + torrent.infoHash + ':download', chunkSize);
          }, 400));
          torrent.once('done', () => {
            this.emit('torrent:' + torrent.infoHash + ':done');
          });
          
        } catch(err) {
          console.log(pe.render(err));
          reject(err);
        }
      });
    }
    getTorrentStatus (opts) {
      return new Promise((resolve, reject) => {
        let torrent = wtClient.get(opts.torrentId);
        if(torrent)
          return resolve({
            downloaded: torrent.downloaded,
            received: torrent.received,
            eta: torrent.timeRemaining,
            progress: Math.round(torrent.progress * 1000) / 10,
            downloadSpeed: torrent.downloadSpeed(),
            uploadSpeed: torrent.uploadSpeed()
          });
        reject(new TypeError('Torrent not found'));
      });
    }
  };

module.exports = Client;