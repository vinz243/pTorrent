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


var stores = {
  TorrentStore: new TorrentStore()
};

var flux = new Fluxxor.Flux(stores, TorrentActions);

flux.on("dispatch", function(type, payload) {
  if (console && console.log) {
    console.log("[Dispatch]", type, payload);
  }
});

flux.actions.addTorrent('6A20D919EF6203F8C0CC75D194674605A4B768F0');
flux.actions.addTorrent('38D0F91A99C57D189416439CE377CCDCD92639D0');

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
