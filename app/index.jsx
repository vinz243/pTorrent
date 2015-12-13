// You can also include here commons if you want with import 'react-toolbox/lib/commons';
import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/lib/app-bar';
import TorrentList from './components/TorrentList/torrentlist';
import style from './style';

ReactDOM.render((
	<div>
 	 	<AppBar
  			title="pTorrent"
  			iconClassNameRight="muidocs-icon-navigation-expand-more" />
 	 	<section className={style.content}>
 	 	
 	 	
      		<div id="torrents" class="torrents-list">
      			<TorrentList />
  			</div>
    	</section>
    </div>
), document.getElementById('app'));
