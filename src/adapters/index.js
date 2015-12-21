
var Adapter = require('./MockupAdapter');
import consts from './TorrentStateConstants';


export default {
	Client: Adapter.Client,
	Tracker: Adapter.Tracker,
	Peer: Adapter.Peer,
	Torrent: Adapter.Torrent,
	State: consts
};