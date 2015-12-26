require('normalize.css');
import React from 'react';


import TitleBar from './TitleBarComponent';
import TorrentList from './TorrentListComponent';
import TorrentActionBar from './TorrentActionBarComponent';
import TorrentBackground from './TorrentBackgroundComponent';
import SideBar from './SideBarComponent';

import Fluxxor from 'fluxxor';

import {Paper, Card} from 'material-ui/lib';
// import Colors from 'material-ui/lib/styles/colors';

import style from 'styles//Main.scss';

import TorrentStore from 'stores/TorrentStore';
import TorrentActions from 'actions/TorrentActions';
import SocketClient from 'adapter/../SockAdapter/SocketClient';

var socketClient = new SocketClient();

socketClient.listen('status', () => {
	console.log('CALLED');
});

socketClient.status().then((res) => {
	console.log(res);
}).catch((err) => {
	console.log(err);
});

var stores = {
  TorrentStore: new TorrentStore()
};

var flux = new Fluxxor.Flux(stores, TorrentActions);


flux.on('dispatch', function(type, payload) {
  if (console && console.log) { // eslint-disable-line no-console
    console.log('[Dispatch]', type, payload); // eslint-disable-line no-console
  }
});

flux.actions.addTorrent('6A20D919EF6203F8C0CC75D194674605A4B768F0');
flux.actions.addTorrent('38D0F91A99C57D189416439CE377CCDCD92639D0');

// flux.actions.addTorrent('magnet:?xt=urn:btih:09e37f73e51f403bb543517f0d0a2e1283d61eb0&dn=archlinux-2015.12.01-dual.iso&tr=udp://tracker.archlinux.org:6969&tr=http://tracker.archlinux.org:6969/announce');

class AppComponent extends React.Component {
  render() {
    return (
      <div>
 	 			<TitleBar />
				<TorrentBackground />
				<Paper zDepth={2} className={style.middleContainer}></Paper>
		
		 	 			<section className={style.content}>
		 	 				<SideBar />
		 	 				<div className={style.torrents}>

		 	 					<TorrentActionBar />
		 	 					<Card >
		    		  				<TorrentList flux={flux} />
		  						</Card>
		  					</div>
		    			</section>
		
    		</div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
