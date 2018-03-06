import React, { Component } from 'react';
import logo from './logo.svg';
import SearchBar from './../SearchBar/SearchBar';
import SearchResults from './../SearchResults/SearchResults';
import Playlist from './../Playlist/Playlist';
import './App.css';

 class App extends React.Component {
   constructor(props){
     super(props);
     this.state = {
       searchResults: [{name: 'name',
                        artist: 'artist',
                        album: 'album',
                        id: ''}],
       playlistName: '',
       playlistTracks: [{name: 'name',
                        artist: 'artist',
                        album: 'album',
                        id: ''}],
     }
     this.addTrack = this.addTrack.bind(this);
     this.removeTrack = this.removeTrack.bind(this);
   }
  addTrack(track){
    if (-1 === this.state.playlistTracks.find({id: track.id})) {
      this.setState({playlistTracks: track});
    }
  }
  removeTrack(track){
      
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
            <Playlist onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
