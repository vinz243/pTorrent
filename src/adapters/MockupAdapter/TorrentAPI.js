var torrents = {};

export default {
	registerTorrent: (data) => {
		torrents[data.hash] = data;
	},	
	fetchTorrent: (hash) => {
		return torrents[hash];
	}
 }