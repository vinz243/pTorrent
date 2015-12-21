// import Observable from '../../observable';

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
} 
var index = []

class Torrent {

	constructor(hash) {
		this._init = false;
		this._hash = hash;
	}

	init() {
		var self = this;

		return new Promise((resolve, reject) => {
			let torrent = torrents[self._hash];
			if(!torrent)
				reject(new TypeError('Torrent '+self._hash+' is undefined'));
			if(self._init)
				reject(new TypeError('Torrent '+self._hash+' is already initialized'));
			self._init = true;
			self._title = torrent.title;
			resolve({
				hash: torrent.hash,
				title: torrent.title,
				size: torrent.size
			});
		})
	}

	pause() {
		throw new TypeError("Class AbstractTorrent is abstract");
	}
	stop() {
		throw new TypeError("Class AbstractTorrent is abstract");
	}
	resume() {
		throw new TypeError("Class AbstractTorrent is abstract");
	}
	remove() {
		throw new TypeError("Class AbstractTorrent is abstract");
	}
	getTitle() {
		return this._title;
	}
	getStatus() {
		let self = this;
		return new Promise((resolve, reject) => {
			if(!self._init) {
				return reject(new TypeError('Torrent hasn\'t been initialized'));
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

export default Torrent;