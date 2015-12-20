// import Observable from '../../observable';


class AbstractTorrent {

	constructor(hash) {
		throw new TypeError("Class AbstractTorrent is abstract");
	}

	init() {
		throw new TypeError("Class AbstractTorrent is abstract");
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

	getStatus() {
		throw new TypeError("Class AbstractTorrent is abstract");
	}

	getInfo() {
		throw new TypeError("Class AbstractTorrent is abstract");
	}

	static create(source, config) {

	}
}

export default AbstractTorrent;