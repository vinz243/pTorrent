import Torrent from './torrent'; 
// import Observable from '../../observable';


class MockupClient {

	constructor(config) {
		this._config = config || {};
		this.torrents = []
	}

	addTorrent(torrentData, torrentOptions) {
		return new Promise((resolve, reject) => {
			var torrent;
			var p = Torrent.create(torrentData, torrentOptions).then((t) =>{
				torrent = t;
				return torrent.init();
			}).then((hash) =>{
	
				this.torrents.push(torrent);
				resolve(hash);
			}).catch(reject);
				
		})
	}
	getTorrent(hash) {
		return new Promise((resolve, reject) => {
			let torrent = new Torrent(hash);
			return torrent.init();
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

	setConfig(key, value){
		throw new TypeError('Class AbstractClient is abstract');
	}

}
export default MockupClient;
