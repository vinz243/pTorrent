import React from 'react';

import style from 'styles//Torrent.scss'

import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import LinearProgress from 'material-ui/lib/linear-progress';
import FontIcon from 'material-ui/lib/font-icon';

import prettyBytes from 'pretty-bytes';

const TorrentItem = React.createClass({
  makeETA(ms) {
    let days = Math.round(ms / 86400000);
    ms -= days * 86400000;
    let hours = ms > 0 ? Math.round(ms / 3600000) : 0;
    ms -= hours * 3600000;
    let minutes = ms > 0 ? Math.round(ms / 60000) : 0;
    ms -= minutes * 60000;
    let seconds = ms > 0 ? Math.round(ms / 1000) : 0;
    console.log(days, hours, minutes, seconds);

    return (days > 0 ? days + 'd ': '') + (hours > 0 ? hours + 'h ' : '')
      + (minutes > 0 ? minutes + 'm ' : '')+ (seconds > 0 ? seconds + 's' : '');
  },
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
    }, 200);
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
              <span className={style.etaIndicator} >{this.makeETA(this.state.status.eta)}</span> : null}

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