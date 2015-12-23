import Torrent from './Torrent';
// import Observable from '../../observable';


var INSTANCE;
class MockupClient {

	constructor(config) {
		this._config = config || {};
		this.torrents = []
	}

	addTorrent(torrentData, torrentOptions) {
		return new Promise((resolve, reject) => {
			var torrent;
			Torrent.create(torrentData, torrentOptions).then((t) =>{
				torrent = t;
			
				return torrent.init();
			}).then(() => {
	
				this.torrents.push(torrent);
				resolve(torrent);
			}).catch(reject);
				
		})
	}
	getTorrent(hash) {
		return new Promise((resolve, reject) => {
			let torrent = new Torrent(hash);
			torrent.init().then(() => {
				resolve(torrent);
			}).catch(reject);
		});
	}

	pauseAll(){
		throw new TypeError('Class AbstractClient is abstract');
	}
	resumeAll(){
		throw new TypeError('Class AbstractClient is abstract');
	}

	getUploadSpeed(){
		throw new TypeError('Class AbstractClient is abstract');
	}
	getDownloadSpeed(){
		throw new TypeError('Class AbstractClient is abstract');
	}

	setConfig(){
		throw new TypeError('Not yet implemented');
	}

	static getClient() {
		if(!INSTANCE)
			INSTANCE = new MockupClient();
		return INSTANCE;
	}

}
export default MockupClient;

