require('normalize.css');
import React from 'react';


import TitleBar from './TitleBarComponent';
import TorrentList from './TorrentListComponent';
import TorrentActionBar from './TorrentActionBarComponent';
import TorrentBackground from './TorrentBackgroundComponent';
import StatusWidget from './StatusWidgetComponent';
import SideBar from './SideBarComponent';

import {Paper, Card} from 'material-ui/lib';
// import Colors from 'material-ui/lib/styles/colors';

import style from 'styles//Main.scss';


// import Client from './adapter';

// let yeomanImage = require('../images/yeoman.png');

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
		 	 					<StatusWidget />
		 	 					<TorrentActionBar />
		 	 					<Card >
		    		  				<TorrentList />
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
