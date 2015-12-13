import React from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import FontIcon from 'react-toolbox/lib/font_icon';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import style from './style.scss'
import classnames from 'classnames';

class TorrentItem extends React.Component {
	render () {
		let icon = require("file!../folder-download.png");
		let drateClass = classnames(style.torrent, style.drate);
		let urateClass = classnames(style.torrent, style.urate);
		return (
			 <Card style={{width: '550px'}}>
  			  	<CardTitle
  			  	  avatar={icon}
  			  	  title="Game.Of.Thrones.Season.05.Complete.1080p"
  			 	  subtitle="Downloading"
  				/>
  				<ProgressBar type="linear" mode="determinate" value={83} buffer={90}/>    
  			  <CardText>
  			  	<span className={drateClass}>5.6 Mb/s</span>
  			  	<span className={urateClass}>1.3 Mb/s</span>
  			  </CardText>
  			</Card>
		)
	}
}

export default TorrentItem;