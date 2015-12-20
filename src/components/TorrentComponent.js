import React from 'react';

import style from 'styles//Torrent.scss'

import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import LinearProgress from 'material-ui/lib/linear-progress';
import FontIcon from 'material-ui/lib/font-icon';
  
const TorrentItem = React.createClass({

	render () {

		return (
       <ListItem
         leftAvatar={<Avatar icon={this.props.status == 'downloading' ? 
              <FontIcon className="material-icons" >cloud_download</FontIcon> 
              : (this.props.status != 'seeding' ?
                <FontIcon className="material-icons">cloud_done</FontIcon>
                : <FontIcon className="material-icons">cloud_upload</FontIcon>
                )

         } />}
         // rightIconButton={rightIconMenu}
         primaryText={
          <div>{this.props.torrentName}
            <div className={style.rateIndicators} >
                {this.props.status == 'downloading' ? 
                  <span className={style.downloadRateIndicator} >5.6 Mb/s</span> : null}
                {this.props.status != 'done' ?
                  <span className={style.uploadRateIndicator} >1.3 Mb/s</span> : null}
            </div>
          </div>
        }
         secondaryText={
           <p>
            <span style={{color: Colors.darkBlack}}>
            {this.props.status == 'downloading' ? "Downloading" : 
              (this.props.status == 'seeding' ? "Seeding" : "Done")
            }</span>
            {this.props.status == 'downloading' ? 
              <span className={style.etaIndicator} >2 min 5s</span> : null}

            {this.props.status == 'downloading' ?
                <LinearProgress mode="determinate" value={60} />
              : null
            }
           </p>
         }
         secondaryTextLines={2} />
      
		)
	},
})

export default TorrentItem;