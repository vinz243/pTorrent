

const constants = {
	ADD_TORRENT: 'ADD_TORRENT',
	REMOVE_TORRENT: 'REMOVE_TORRENT',
	PAUSE_TORRENT: 'PAUSE_TORRENT',
	STOP_TORRENT: 'STOP_TORRENT'
}

export default {
  addTorrent: function(hash) {
    this.dispatch(constants.ADD_TORRENT, {hash: hash});
  }
};