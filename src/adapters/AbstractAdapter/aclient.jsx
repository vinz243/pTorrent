import Torrent from './atorrent'; 
// import Observable from '../../observable';


class AbstractClient {

	constructor(config) {
		throw new TypeError('Class AbstractClient is abstract');
	}

	addTorrent(torrentData, torrentOptions) {
		throw new TypeError('Class AbstractClient is abstract');
	}
	getTorrent(hash) {
		throw new TypeError('Class AbstractClient is abstract');
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
export default AbstractClient;