import Fluxxor from 'fluxxor';
// import {Client} from 'adapter';
import Adapter from 'adapter';
import parseTorrent from 'parse-torrent';

const Client = Adapter.Client;
console.log('adapter: ', Adapter);

const constants = {
	ADD_TORRENT: 'ADD_TORRENT',
	REMOVE_TORRENT: 'REMOVE_TORRENT',
	PAUSE_TORRENT: 'PAUSE_TORRENT',
	STOP_TORRENT: 'STOP_TORRENT'
}

const client = Client.getClient();

export default Fluxxor.createStore({

	initialize () {
		this.torrents = {};
		this.bindActions(
			constants.ADD_TORRENT, this.onAddTorrent,
			constants.REMOVE_TORRENT, this.onRemoveTorrent,
			constants.PAUSE_TORRENT, this.onPauseTorrent
			// constants.STOP_TORRENT, this.onStopTorrent
		);
	},
	onAddTorrent (payload) {
		console.log('payload', payload);
		let hash = parseTorrent(payload.hash).infoHash;

		client.addTorrent(payload.hash).then((torrent) => {
			this.torrents[hash] = torrent;
			torrent.on('change', () => {
				this.emit('change');
			});
			this.emit('change');
		}).catch((err) => {
			console.log(err);
			this.emit('change')
		});

	},

	onPauseTorrent (payload) {
		this.torrent[payload.hash].pause().then(() => {
			this.emit('change');
		}).catch(() => {
			this.emit('change')
		})
	},

	onRemoveTorrent (payload) {
		this.torrents[payload.hash].remove().then(() => {
			delete this.torrents[payload.hash];
			this.emit('change')
		}).catch(() => {
			this.emit('change');
		});
	},

	getState () {
		return {torrents: this.torrents};
	}
});