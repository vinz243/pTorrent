// You can also include here commons if you want with import 'react-toolbox/lib/commons';
import React from 'react';
import ReactDOM from 'react-dom';


import TitleBar from './components/TitleBar/titlebar';
import TorrentList from './components/TorrentList/torrentlist';

import FontIcon from 'material-ui/lib/font-icon';
import {TextField, Card, CardText} from 'material-ui/lib';

import style from './style';


ReactDOM.render((
	<div>
 	 	<TitleBar />
 	 	<section className={style.content}>
 	 		<div className={style.topContainer}>
 	 		</div>
 	 		<Card className={style.torrents}>
      			<TorrentList />
  			</Card>
    	</section>

    </div>
), document.getElementById('app'));
