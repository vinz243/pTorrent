'use strict';

import React from 'react';

import {Avatar, FontIcon, CardHeader} from 'material-ui/lib';
import Colors from 'material-ui/lib/styles/colors';

import style from 'styles//StatusWidget.scss';

class StatusWidgetComponent extends React.Component {
  render() {
    return (
      <div className={style.statusWidget}>

  			<CardHeader
  			  title='&#8595; 5.2 Mb/s' titleStyle={{
  			  								fontSize: '19px',
  			  								color: '#fff'
  			  							}}
  			  subtitle='16 Mb/s &#8593; ' subtitleStyle={{
  			  												color: '#fff',
  			  												marginTop: '8px'
  			  											}}
  			  avatar={
						<Avatar
							size={64} icon={
			  					<FontIcon style={{
			  						fontSize: '34px',
			  						margin: '14px'
			  						}} className='material-icons'>cloud_download</FontIcon>
			  			}
			  			backgroundColor={Colors.white}
			  			color={Colors.lime800} />
  			  }/>
			</div>
    );
  }
}

StatusWidgetComponent.displayName = 'StatusWidgetComponent';

// Uncomment properties you need
// StatusWidgetComponent.propTypes = {};
// StatusWidgetComponent.defaultProps = {};

export default StatusWidgetComponent;
