'use strict';

import React from 'react';

import style from 'styles//SideBar.scss';

import {List, ListItem, FontIcon} from 'material-ui/lib';
import StatusWidget from './StatusWidgetComponent.js';

class SideBarComponent extends React.Component {
  
	render () {
		return (

      <section className={style.sideBar}>
          <StatusWidget />
          <List>
			     	<ListItem primaryText={<b>All torrents</b>}
              style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}
              leftIcon={<FontIcon className="material-icons">list</FontIcon>} />
            <ListItem primaryText={"Downloading"}
              leftIcon={<FontIcon className="material-icons">file_download</FontIcon>} />
            <ListItem primaryText={"Done"}
              leftIcon={<FontIcon className="material-icons">done_all</FontIcon>} />
            <ListItem primaryText={"Seeding"}
              leftIcon={<FontIcon className="material-icons">file_upload</FontIcon>} />
            <ListItem primaryText={"Inactive"}
              leftIcon={<FontIcon className="material-icons">cloud_off</FontIcon>} />
          </List>
      </section>
		);
	}
}

SideBarComponent.displayName = 'SideBarComponent';

// Uncomment properties you need
// SideBarComponent.propTypes = {};
// SideBarComponent.defaultProps = {};

export default SideBarComponent;
