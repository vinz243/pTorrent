import React from 'react';
import {Tab, Tabs} from 'react-toolbox';
import TorrentItem from '../Torrent/torrent';
class TorrentList extends React.Component {
  state = {
    index: 0
  };

  handleTabChange = (index) => {
    this.setState({index});
  };

  handleActive = () => {
    console.log('Special one activated');
  };

  render () {
    return (
      <Tabs index={this.state.index} onChange={this.handleTabChange}>
        <Tab label='All'>
          <TorrentItem />
        </Tab>
        <Tab label='Games' onActive={this.handleActive}><small>Secondary content</small></Tab>
        <Tab label='Movies' ><small>Disabled content</small></Tab>
        <Tab label='Books' ><small>Fourth content hidden</small></Tab>
        <Tab label='Music'><small>Fifth content</small></Tab>
      </Tabs>
    );
  }
}

export default TorrentList;
