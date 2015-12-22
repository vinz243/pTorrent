/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;
// import createComponent from 'helpers/shallowRenderHelper';

// import Main from 'components/Main';
import {Client, Torrent, State} from 'adapters/MockupAdapter';
import TorrentAPI from 'adapters/MockupAdapter/TorrentAPI';
import {assert} from 'chai';


const torrents = [{
	hash: '6A20D919EF6203F8C0CC75D194674605A4B768F0',
	title: 'Ubuntu-15.10-desktop-amd64.iso',
	size: 4.5366e12
}];

describe('TorrentAPI', () => {

  it('should declare a registerTorrent function', () => {
   expect(typeof TorrentAPI.registerTorrent).to.equal('function');
 });

  it('should declare a fetchTorrent function', () => {
   TorrentAPI.fetchTorrent.should.be.a('function');
 });

  it('should register a torrent', () => {
   TorrentAPI.registerTorrent(torrents[0]);
 });

  it('should fetch torrent', () => {
    TorrentAPI.fetchTorrent(torrents[0].hash).should.eql(torrents[0]);
  });
    // it('should have its component name as default className', () => {
    //   expect(MainComponent.props.className).to.equal('index');
    // });
});


  let client = new Client();
describe('Client', () => {

  it('should be able to add torrent', (done) => {
    client.addTorrent(torrents[0].hash).then((data) => {
      data.getHash().should.equal(torrents[0].hash);
      done()
    }).catch(done);
  });
  it('should be able to access torrent', (done) => {
    client.getTorrent(torrents[0].hash).then((data) => {
      data._hash.should.equal(torrents[0].hash);
      data.getTitle().should.equal(torrents[0].title);
      done();
    }).catch(done);
  });
  it('should error when torrent not found', (done) => {
    client.getTorrent('ABC').then((data) => {
      assert(false);
      done();
    }).catch((err) => {
      done();
    });
  });
});

const getTorrent = () => {
  return client.getTorrent(torrents[0].hash);
}

describe('Torrent', () => {
  var torrent;

  beforeEach((done) => {
    getTorrent().then((data) => {
      torrent = data;
      done();
    });
  });

  it('should not init() twice', (done) => {
    torrent.init().then(() => {
      assert(false);
      done();
    }).catch((err) => {
      done();
    });
  });

  it('should not be able getStatus() of uninitialized torrent', (done) => {
    (new Torrent('ABC')).getStatus().then(() => {
      assert(false);
    }).catch((err) => {
      done();
    });
  });

  it('should return status', (done) => {
    torrent.getStatus().then((status) => {
      status.uploadSpeed.should.be.a('number');
      status.downloadSpeed.should.be.a('number');
      status.eta.should.be.a('number');
      status.progress.should.be.a('number');
      done();
    }).catch(done);
  });

  it('should have UNINITIALIZED status before init()', () => {
    let torrent = new Torrent('ABC');
    torrent.getState().should.equal(State.UNINITIALIZED);
  });

  it('should have INVALID status after init() of invalid torrent', (done) => {
    let torrent = new Torrent('ABC');
    torrent.init().catch(() => {
      torrent.getState().should.equal(State.INVALID);
      done();
    }).catch(done);
  });

  it('should pause() and set PAUSED state', (done) => {
    torrent.pause().then(() => {
      torrent.getState().should.equal(State.PAUSED);
      return torrent.resume();
    }).then(() => {
      torrent.getState().should.not.equal(State.PAUSED);
      done();
    }).catch(done);
  });

  it('should stop() and set STOPPED state', (done) => {
    torrent.stop().then(() => {
      torrent.getState().should.equal(State.STOPPED);
      return torrent.resume();
    }).then(() => {
      torrent.getState().should.equal(State.CONNECTING);
      done();
    }).catch(done);
  });

  it('should remove() and set REMOVED state', (done) => {
    torrent.remove().then(() => {
      assert(torrent.isRemoved());
      done();
    })
  });
});
