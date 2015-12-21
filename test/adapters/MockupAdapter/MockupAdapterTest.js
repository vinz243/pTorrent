/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;
// import createComponent from 'helpers/shallowRenderHelper';

// import Main from 'components/Main';
// import {Client, Torrent} from 'adapters/MockupAdapter';
import TorrentAPI from 'adapters/MockupAdapter/TorrentAPI';
const torrents = [{
	hash: '6A20D919EF6203F8C0CC75D194674605A4B768F0',
	title: 'Ubuntu-15.10-desktop-amd64.iso',
	size: 4.5366e12
}]

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
