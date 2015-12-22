// import Observable from '../../observable';
import State from '../TorrentStateConstants.js';
import MainUtils from 'utils/main';


const torrents = {
	'6A20D919EF6203F8C0CC75D194674605A4B768F0': {
		hash: '6A20D919EF6203F8C0CC75D194674605A4B768F0',
		title: 'Ubuntu-15.10-desktop-amd64.iso',
		size: 4.5366e12,
		status: {
			uploadSpeed: 4972800,
			downloadSpeed: 28192128,
			eta: 192,
			progress: 45,
			downloaded: 2.04147e12
		}
	}
};

var index = [];
var UNINITIALIZED_ERROR = () => {
	return new TypeError('Torrent hasn\'t been initialized')
};
var INVALID_ERROR = () => {
	return new TypeError('Torrent is invalid');
}

class Torrent {

	constructor(hash) {
		this._init = false;
		this._hash = hash;
		this._state = State.UNINITIALIZED;
	}
	isValid() {
		return this.isInitialized() && !this.isInvalid() && !this.isUnknown();
	}

	init() {

		// use this in promise
		var self = this;

		return new Promise((resolve, reject) => {
			let torrent = torrents[self._hash];

			if(!torrent){
				this._state = State.INVALID;
				return reject(new TypeError('Torrent '+self._hash+' is undefined'));
			}

			// Do not init() twice
			if(this.isInitialized())
				return reject(new TypeError('Torrent '+self._hash+' is already initialized'));

			self._init = true;
			self._title = torrent.title;
			self._state = State.LOADING;

			resolve({
				hash: torrent.hash,
				title: torrent.title,
				size: torrent.size
			});
		})
	}
	
	pause() {
		let self = this;
		return new Promise((resolve, reject) => {

			if(!this.isValid())
				return reject(INVALID_ERROR());

			self._state = State.PAUSED;
			resolve()
		});
	}

	stop() {
		let self = this;
		return new Promise((resolve, reject) => {

			if(!this.isValid())
				return reject(INVALID_ERROR());

			self._state = State.STOPPED;
			resolve();
		});
	}

	resume() {
		let self = this;
		return new Promise((resolve, reject) => {
			if(!this.isValid()) {
				return reject(INVALID_ERROR());
			}

			self._state = State.CONNECTING;
			resolve();

		});
	}

	remove() {
		let self = this;
		return new Promise((resolve, reject) => {
			if(!this.isValid()) {
				return reject(INVALID_ERROR());
			}
			self.stop().then(() => {
				self._state = State.REMOVED;
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
			resolve(torrents[self._hash].status);
		});
	}

	getInfo() {
		throw new TypeError("Class AbstractTorrent is abstract");
	}

	static create(source, config) {
		return new Promise((resolve, reject) => {
			if((typeof source !== 'string') || !torrents[source])
				return reject(new TypeError('Torrent source is invalid: ' + source));
			index.push(source);
			resolve(new Torrent(source));
		});
	}
}
MainUtils.populateStateChecks(Torrent, State);
export default Torrent;
