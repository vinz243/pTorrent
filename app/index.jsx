// You can also include here commons if you want with import 'react-toolbox/lib/commons';
import React from 'react';
import ReactDOM from 'react-dom';


import TitleBar from './components/TitleBar/titlebar';
import TorrentList from './components/TorrentList/torrentlist';
import TorrentActionBar from './components/TorrentActionBar';
import FontIcon from 'material-ui/lib/font-icon';
import {TextField, Card, CardText, Paper} from 'material-ui/lib';
import Colors from 'material-ui/lib/styles/colors'
import style from './style';
import TorrentBackground from './components/TorrentBackground';


ReactDOM.render((
	<div>
 	 	<TitleBar />
		<TorrentBackground />
		<Paper zDepth={2} className={style.middleContainer}></Paper>
 	 	<section className={style.content}>
 	 		<div className={style.torrents}>
 	 			<TorrentActionBar />
 	 			<Card >
      				<TorrentList />
  				</Card>
  			</div>
    	</section>

    </div>
), document.getElementById('app'));
