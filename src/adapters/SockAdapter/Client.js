import Torrent from './Torrent';
import SocketClient from './SocketClient';
// import WebTorrent from 'webtorrent/webtorrent.debug';
// import Observable from '../../observable';

var INSTANCE;
class Client {

	constructor(config) {
		this._config = config || {};
		this.torrents = [];
    
	}

	addTorrent(torrentData, torrentOptions = {}) {
		return new Promise((resolve, reject) => {
			console.log('add torrent ', torrentOptions, torrentData);
			var torrent;

			torrentOptions.client = this._client;
			
			Torrent.create(torrentData, torrentOptions).then((t) =>{
				torrent = t;
				
				return torrent.init();
			}).then(() => {
				this.torrents.push(torrent);
				resolve(torrent);
			}).catch(reject);
				
		});
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
			INSTANCE = new Client();
		return INSTANCE;
	}

}
export default Client;

