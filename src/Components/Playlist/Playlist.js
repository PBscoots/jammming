import React, { Component } from 'react';
import Tracklist from './../Tracklist/Tracklist';
import './Playlist.css';

class Playlist extends Component {
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  handleNameChange(event){
    this.props.onNameChange(event.target.value);
    event.preventDefault();
  }
  render() {
    return (
      <div className="Playlist">
        <input onChange={this.handleNameChange} defaultValue={'New Playlist'}/>
        <Tracklist onRemove={this.props.onRemove} tracks={this.props.playlistTracks} />
        <a onClick={this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
