import React from 'react';

import style from 'styles//Torrent.scss'

import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import LinearProgress from 'material-ui/lib/linear-progress';
import FontIcon from 'material-ui/lib/font-icon';

import prettyBytes from 'pretty-bytes';

const TorrentItem = React.createClass({
   componentDidMount () {
    let intervalId = setInterval(() => {

      let torrent = this.props.torrent;

      torrent.getStatus().then((status) => {
        
        if (!this.isMounted()) 
          return clearInterval(intervalId);
        
        this.setState({
          torrent: torrent,
          status: status
        });
      });
    }, 1000);
  },
  getInitialState () {
    return {
      status : {

        uploadSpeed: 0,
        downloadSpeed: 0,
        eta: 0,
        progress: 0,
        downloaded: 0
      }
    };
  },
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
                  <span className={style.downloadRateIndicator}>
                    {prettyBytes(this.state.status.downloadSpeed)}
                  </span> : null}
                
                  <span className={style.uploadRateIndicator} >
                    {prettyBytes(this.state.status.uploadSpeed)}</span>
            </div>
          </div>
        }
         secondaryText={
           <div>
            <span style={{color: Colors.darkBlack}}>
            {this.props.torrent.getState()[0] + this.props.torrent.getState().substring(1).toLowerCase()
            }</span>
            {this.props.torrent.isDownloading ?
              <span className={style.etaIndicator} >2 min 5s</span> : null}

            {['SEEDING', 'DONE'].indexOf(this.props.torrent.getState()) ?
                <LinearProgress mode={
                  (this.getIconFromState() === 'cloud_queue') ? 'indeterminate': 'determinate'
                } value={this.state.status.progress} color={"#4CAF50"} />
              : null
            }
           </div>
         }
         secondaryTextLines={3} />
      
		)
	}
})

export default TorrentItem;