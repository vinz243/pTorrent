import React from 'react';

import {List, ListDivider, ListItem, FontIcon} from 'material-ui/lib';

import style from './style';

class SideBar extends React.Component {
	render () {
		return (
      <section className={style.sideBar}>
          <List>
			     	<ListItem primaryText={<b>All torrents</b>}
              style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
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

export default SideBar;