import React from 'react';
// import {Tab, Tabs} from 'react-toolbox';
import TorrentItem from './TorrentComponent';
import style from 'styles//Torrent.scss';
import {List} from 'material-ui/lib/lists';
import {Tab, Tabs} from 'material-ui/lib/tabs';

import DefaultRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Fluxxor from 'fluxxor';

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

const downloading = (val) => {
  console.log("value:", val);
  return val.isDownloading();
}
const seeding = (val) => {
  return val.isSeeding();
}
const done = (val) => {
  return val.isDone();
}
const loading =(val) => {
  return val.isLoading();
}


const TorrentList = React.createClass({

  mixins: [FluxMixin, StoreWatchMixin("TorrentStore")],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  
  getInitialState () {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme)
    };
  },
  getStateFromFlux () {
    var flux = this.getFlux();
    // Our entire state is made up of the TodoStore data. In a larger
    // application, you will likely return data from multiple stores, e.g.:
    //
    //   return {
    //     todoData: flux.store("TodoStore").getState(),
    //     userData: flux.store("UserStore").getData(),
    //     fooBarData: flux.store("FooBarStore").someMoreData()
    //   };
    return flux.store("TorrentStore").getState();
  },

  componentWillMount () {
    this.state = this.state || this.getInitialState();
    let newMuiTheme = this.state.muiTheme;
    newMuiTheme.tabs.selectedTextColor = '#000';
    newMuiTheme.tabs.textColor = 'rgba(0, 0, 0, 0.7)';
  
    this.setState({
      muiTheme: newMuiTheme
    });

    setInterval(() => {
      this.forceUpdate();
    }, 1500);
  },
  
  //pass down updated theme to children
  getChildContext () {
    return {
      muiTheme: this.state.muiTheme
    };
  },

  render () {
    let torrents = Object.keys(this.state.torrents).map((hash) => {
      return this.state.torrents[hash];
    });
    return (
      <Tabs className={style.mainView} tabItemContainerStyle={{ backgroundColor: '#fff',
                                                                color: '#000',
                                                                boxShadow: '0px -1px #EEE inset'}}>
        <Tab label='All'>
          <List subheader="Downloading">
            {torrents.filter(downloading).map((torrent) => {
              return <TorrentItem torrent={torrent} />;
            })}
          </List>
          <List subheader="Seeding">
            {torrents.filter(seeding).map((torrent) => {
              return <TorrentItem torrent={torrent} />;
            })}
          </List>
          <List subheader="Loading">
            {torrents.filter(loading).map((torrent) => {
              return <TorrentItem torrent={torrent} />;
            })}
          </List>
        </Tab>
        <Tab label='Games' ><small>Secondary content</small></Tab>
        <Tab label='Movies' ><small>Disabled content</small></Tab>
        <Tab label='Books' ><small>Fourth content hidden</small></Tab>
        <Tab label='Music'><small>Fifth content</small></Tab>
      </Tabs>
    );
  }
});
//  this.state.muiTheme.tabs.selectedTextColor : this.state.muiTheme.tabs.textColor

export default TorrentList;
