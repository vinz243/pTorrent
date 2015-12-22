import React from 'react';

import style from 'styles//Torrent.scss'

import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import LinearProgress from 'material-ui/lib/linear-progress';
import FontIcon from 'material-ui/lib/font-icon';
  
const TorrentItem = React.createClass({
  getIconFromState (state = this.props.torrent.getState()) {

    switch(state) {
      case 'DOWNLOADING':
        return 'cloud_download';
      case 'SEEDING':
        return 'cloud_upload';
      case 'DONE':
        return 'cloud_done';
      case 'CONNECTING':
      case 'UNKNOWN':
      case 'UNINITIALIZED':
      case 'LOADING':
        return 'cloud_queue';
      case 'PAUSED':
      case 'STOPPED':
      case 'INVALID':
      case 'ERRORED':
      case 'REMOVED':
      default: return 'cloud_off'
    }
  },

	render () {


		return (
       <ListItem
         leftAvatar={
            <Avatar icon={
              <FontIcon className="material-icons">
                {this.getIconFromState()}
              </FontIcon>
            } />}
         // rightIconButton={rightIconMenu}
         primaryText={
          <div>{this.props.torrent.getTitle()}
            <div className={style.rateIndicators} >
                {this.props.torrent.isDownloading() ?
                  <span className={style.downloadRateIndicator} >5.6 Mb/s</span> : null}
                
                  <span className={style.uploadRateIndicator} ></span> : null
            </div>
          </div>
        }
         secondaryText={
           <p>
            <span style={{color: Colors.darkBlack}}>
            {this.props.torrent.getState()[0] + this.props.torrent.getState().substring(1).toLowerCase()
            }</span>
            {this.props.torrent.isDownloading ?
              <span className={style.etaIndicator} >2 min 5s</span> : null}

            {this.props.torrent.isDownloading ?
                <LinearProgress mode={
                  (this.getIconFromState() === 'cloud_queue') ? 'indeterminate': 'determinate'
                } value={60} color={"#4CAF50"} />
              : null
            }
           </p>
         }
         secondaryTextLines={2} />
      
		)
	}
})

export default TorrentItem;