import React from 'react';
import SearchBar from './../SearchBar/SearchBar';
import SearchResults from './../SearchResults/SearchResults';
import Playlist from './../Playlist/Playlist';
import Spotify from './../../util/Spotify.js';
import './App.css';


 class App extends React.Component {
   constructor(props){
     super(props);
     this.state = {
       searchResults: [{name: 'name',
                        artist: 'artist',
                        album: 'album',
                        id: '',
                        uri: ''}],
       playlistName: '',
       playlistTracks: [{name: 'name',
                        artist: 'artist',
                        album: 'album',
                        id: '',
                        uri: ''}],
     }
     this.addTrack = this.addTrack.bind(this);
     this.removeTrack = this.removeTrack.bind(this);
     this.updatePlaylistName = this.updatePlaylistName.bind(this);
     this.savePlaylist = this.savePlaylist.bind(this);
     this.search = this.search.bind(this);
   }
  addTrack(track){
    if (-1 === this.state.playlistTracks.find({id: track.id})) {
      this.setState({ playlistTracks: this.state.playlistTracks.concat(track)});
    }
  }
  removeTrack(track){
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(function(check) {
        return check.id !== track.id;
      })
    });
  }
  updatePlaylistName (name) {
    this.setState({playlistName: name});
  }
  savePlaylist(){
    let trackURIs = this.state.playlistTracks.map(track=>{return track.uri;});
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({
      playlistName: '',
      searchResults: []
    });
  }
  search(term){
    this.setState({searchResults: Spotify.search(term)});
    console.log(this.state.searchResults);
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
