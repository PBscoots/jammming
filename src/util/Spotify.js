const SPOTIFY_ID ='6a32eeeb97a94bfcb486f9066fc46e06';
let TOKEN = '';
let expiresIn = '';
const endpoint = 'https://accounts.spotify.com/authorize';
const redirect_uri = 'http://localhost:3000/';

const Spotify = {
  getAccessToken(){
    if (TOKEN !== '') {
      return TOKEN;
    }
    let tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    let expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if(tokenMatch && expiresInMatch){
      TOKEN = tokenMatch[1];
      expiresIn = Number(expiresInMatch);
      // sets the timeout
      window.setTimeout(() => TOKEN = '', expiresIn * 1000);
      // clears the token on timeout
      window.history.pushState('Access Token', null, '/');
      return TOKEN;
    } else {
      // scope redirect
      window.location = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
    }
  },
  search(term){
        let accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
          {
            headers: {
              'Authorization': 'Bearer ' + accessToken,
            }
          })
        .then(response => {
            if (response.ok){
              return response.json();
            }
            throw new Error('Request Failed!');
          }, networkError => console.log(networkError.message))
        .then(jsonResponse => {
          let tracks = [];
          tracks = jsonResponse.tracks.items.map(track => {
            return {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri
            }
          });
          console.log(tracks);
          return tracks;
        });
  },
  savePlaylist(playlistName, trackURIs){
    if (playlistName === '' && trackURIs === '') {
      return;
    }
    let headers = {
      'Authorization': 'Bearer ' + TOKEN
    }
    let user_id = '';
    let playlist_id = '';
    // fetch user ID
    fetch(`https://api.spotify.com/v1/me`, {
      headers: headers})
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request Failed!');
    }, networkError => console.log(networkError.message))
    .then(jsonResponse => {
      user_id = jsonResponse.id;
    })
    //  create new playlist
    fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`,{
      headers: headers,
      method: 'POST',
      body: JSON.stringify({name: playlistName})})
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request Failed!')
    }, networkError => console.log(networkError.message))
    .then(jsonResponse => {
      playlist_id = jsonResponse.id;})
    // add tracks to the playlist
    .fetch(`https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`,{
      headers: headers,
      method: 'POST',
      contenttype: 'application/json',
      body: JSON.stringify({uris: trackURIs})
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request Failed!');
    }, networkError => console.log(networkError.message))
    .then(jsonResponse => {
      playlist_id = jsonResponse.id;
    })
  }
};

export default Spotify;
