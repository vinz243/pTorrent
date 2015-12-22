export default {
	
	// When a torrent has been initialized and loaded, 
	// And it is loading informations
	// Typically in the case of a magnet
	// Or after resuming torrents
	CONNECTING: 'CONNECTING',

	// When a torrent has been fully downloaded
	// And it is seeding it regardless of the upload rate
	SEEDING: 'SEEDING',

	// Torrent which is currently being downloaded
	DOWNLOADING: 'DOWNLOADING',

	// Invalid torrent (internal)
	// e. g.: Wrong hash, invalid magnet...
	INVALID: 'INVALID',

	// Unknown state
	UNKNOWN: 'UNKNOWN',

	// When a torrent is stopped
	STOPPED: 'STOPPED',

	// When a torrent is paused
	PAUSED: 'PAUSED',

	// When a torrent is not downloading/seeding
	// for all the time
	DONE: 'DONE',

	// Tracker or file system error
	ERRORED: 'ERRORED',

	// Before init() has been called
	UNINITIALIZED: 'UNINITIALIZED',

	// Torrent client is loading info locally
	LOADING: 'LOADING',

	// Torrent has just been removed
	// Therefore should not appear anymore
	REMOVED: 'REMOVED'
};