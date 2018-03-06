import React, { Component } from 'react';
import logo from './logo.svg';
import Tracklist from './../Tracklist/Tracklist';
import './Playlist.css';

class Playlist extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'}/>
        <Tracklist onRemove={this.props.onRemove} tracks={this.props.playlistTracks} />
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
