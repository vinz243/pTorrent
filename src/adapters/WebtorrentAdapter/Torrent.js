// import Observable from '../../observable';
import State from '../TorrentStateConstants.js';
import MainUtils from 'utils/main';
import {EventEmitter} from 'events';
import parseTorrent from 'parse-torrent';

var INVALID_ERROR = () => {
	return new TypeError('Torrent is invalid');
}

class Torrent extends EventEmitter {

	constructor(hash, source, config) {

		super();

		EventEmitter.call(this);
		
		this._init = false;
		this._hash = hash;
		this._source = source;
		this._state = State.UNINITIALIZED;
		this._torrent = undefined;
		this._config = config;
	}

	isValid() {
		return this.isInitialized() && !this.isInvalid() && !this.isUnknown();
	}

	init() {

		// use this in promise
		var self = this;

		return new Promise((resolve, reject) => {
			if(!this._hash){
				this._state = State.INVALID;
				return reject(INVALID_ERROR());
			}

			// Do not init() twice
			if(this.isInitialized())
				return reject(new TypeError('Torrent '+self._hash+' is already initialized'));

			var parsed;
			try {
				parsed = parseTorrent(this._source);

			} catch(err) {
				return reject(err);
			}
			self._init = true;
			self._title = parsed.name || 'loading title...';
			self._state = State.LOADING;
			
			this.emit('change');
			this.emit('change:state');
			this.emit('initializing');

			this._torrent = this._config.client.add(this._source, (torr) => {
				console.log('TORRENT ADDED');
				this._state = State.CONNECTING;
				this.emit('change');
				this.emit('change:state');
				this.emit('connecting');
			});

			this._state = State.LOADING;

			this.emit('change');
			this.emit('change:state');
			this.emit('initialized');

			this._torrent.on('download', (chunkSize) => {
				if(!this.isDownloading()){
					this._state = State.DOWNLOADING;
					this.emit('change');
					this.emit('change:state');
					this.emit('downloading')
				}
				this.emit('download', chunkSize);
			});

			this._torrent.on('upload', (chunkSize) => {
				this.emit('upload', chunkSize);
			});

			this._torrent.on('error', (err) => {
				console.log('Error: ', err);
				this.emit('error', err);
			});

			this.on('download', this._onDownload);
			this.on('upload', this._onUpload);
			resolve({
				hash: this._hash,
				title: this._name
			});
		});

}

_onDownload (chunkSize) {
	let time = Date.now();
	if(this._dLastTime) {
			// Approx derivative of downloaded bytes to get speed
			let deltaTime = time - this._dLastTime;
			this._downloadSpeed = (chunkSize * 1000) / deltaTime; 
		}
		this._dLastTime = time;
	}
	_onUpload (chunkSize) {
		let time = Date.now();
		if(this._uLastTime) {
			// Approx derivative of downloaded bytes to get speed
			let deltaTime = time - this._uLastTime;
			this._uploadSpeed = (chunkSize * 1000) / deltaTime; 
		}
		this._uLastTime = time;
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

			resolve({
				uploadSpeed: this._uploadSpeed || 0,
				downloadSpeed: this._downloadSpeed || 0,
				downloaded: this._torrent.downloaded || 0,
				progress: this.progress * 100 || 0,
				eta: (1 - this.progress) / this.downloadSpeed || 0
			});
		});
	}
	getHash() {
		return this._hash;
	}
	getInfo() {
		throw new TypeError('Not yet implemented');
	}

	static create(source, config) {
		return new Promise((resolve, reject) => {
			console.log('create', source, config);

			try {
				let parsed = parseTorrent(source);
				let trt = new Torrent(parsed.infoHash, source, config);
				resolve(trt);
			} catch (err) {
				console.log(err);
				return reject(err);
			}
		});
	}
}

MainUtils.populateStateChecks(Torrent, State);

export default Torrent;

