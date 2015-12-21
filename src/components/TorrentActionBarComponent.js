import React from 'react';

import {RaisedButton, FontIcon} from 'material-ui/lib';
import style from 'styles//TorrentActionBar.scss';
import classNames from 'classnames';


const TorrentActionBar = React.createClass({

	render () {
		let buttonClass = classNames('material-icons', style.button);
		return (
			<div className={style.torrentActionBar}>
				<RaisedButton primary labelPosition='after' label='Pause all' style={{marginRight: '36px'}}>
		 			<FontIcon className={buttonClass} color='#fff' >pause</FontIcon>
				</RaisedButton>
				<RaisedButton primary labelPosition='after' label='' style={{marginRight: '24px'}}>
		 			<FontIcon className={buttonClass} style={{paddingLeft: '4px'}} color='#fff' >add</FontIcon>
				</RaisedButton>
			</div>
		)
	}
});

export default TorrentActionBar;