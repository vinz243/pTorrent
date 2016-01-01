// import Observable from '../../observable';
import State from '../TorrentStateConstants.js';
import MainUtils from 'utils/main';
import {EventEmitter} from 'events';

import SocketClient from './SocketClient';

var INVALID_ERROR = () => {
	return new TypeError('Torrent is invalid');
}

class Torrent extends EventEmitter {

	constructor(source) {
		super();
		this._init = false;
		this._source = source;
		this._state = State.UNINITIALIZED;
	}

	isValid() {
		return this.isInitialized() && !this.isInvalid() && !this.isUnknown();
	}

	init() {

		// use this in promise
		var self = this;

		return new Promise((resolve, reject) => {

			// Do not init() twice
			if(this.isInitialized())
				return reject(new TypeError('Torrent is already initialized'));
      
      SocketClient.getInstance().connect().then(() => {

        return SocketClient.getInstance().addTorrent({source: this._source});

      }).then((torrent) => {

        self._init = true; 
        self._title = torrent.dn || torrent.name || 'untitled';
        self._state = State.LOADING;
        self._hash = torrent.infoHash;

			  this.emit('change');
		  	this.emit('initialized');

        SocketClient.getInstance().connect().then(() => {
          SocketClient.getInstance().listen('download', this._hash, () => {
            if(!this.isDownloading()) {
              this._state = State.DOWNLOADING;
              this.emit('change');
              this.emit('change:state');
            }
            this.emit('download');
          });
        });
        resolve(this);
      });
		});

	}

	refreshState () {

	}

	pause() {
		this.emit('pausing');
		return new Promise((resolve, reject) => {

			if(!this.isValid())
				return reject(INVALID_ERROR());

			this._state = State.PAUSED;
			this.emit('change');
			this.emit('change:state');
			this.emit('paused');
			resolve()
		});
	}

	stop() {
		this.emit('stopping')
		return new Promise((resolve, reject) => {

			if(!this.isValid())
				return reject(INVALID_ERROR());

			this._state = State.STOPPED;
			this.emit('change');
			this.emit('change:state');
			this.emit('paused');
			resolve();
		});
	}

	resume() {
		this.emit('resuming')
		return new Promise((resolve, reject) => {

			if(!this.isValid()) {
				return reject(INVALID_ERROR());
			}

			this._state = State.CONNECTING;
			this.emit('change');
			this.emit('change:state');
			this.emit('resumed');
			resolve();

		});
	}

	remove() {
		this.emit('removing')
		return new Promise((resolve, reject) => {
			if(!this.isValid()) {
				return reject(INVALID_ERROR());
			}
			this.stop().then(() => {
				this._state = State.REMOVED;
				this.emit('change');
				this.emit('change:state');
				this.emit('removed')
				resolve();
			});
		});
	}
	getTitle() {
		return this._title;
	}
	getState() {
		return this._state;
	}
	getStatus() {
		let self = this;
		return new Promise((resolve, reject) => {
			if(!this.isValid()) {
				return reject(INVALID_ERROR());
			}
			SocketClient.getInstance().connect().then(() => {
        return SocketClient.getInstance()
          .getTorrentStatus({torrentId: this._hash});
      }).then(resolve).catch(reject);
		});
	}
	getHash() {
		return this._hash;
	}
	getInfo() {
		throw new TypeError('Not yet implemented');
	}

	static create(source) {
		return new Promise((resolve, reject) => {
     	let torrent = new Torrent(source);
			resolve(torrent);
		});
	}
}

MainUtils.populateStateChecks(Torrent, State);

export default Torrent;
