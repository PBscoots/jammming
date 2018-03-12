const SPOTIFY_ID ='6a32eeeb97a94bfcb486f9066fc46e06';
const endpoint = 'https://accounts.spotify.com/authorize';
const redirect_uri = 'https://cc-av-jammming.surge.sh';

const Spotify = {
  accessToken: '',
  getAccessToken(){
    if (this.accessToken !== '') {
      return this.accessToken;
    }
    let tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    let expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if(tokenMatch && expiresInMatch){
      let token = tokenMatch[1];
      let expiresIn = Number(expiresInMatch);
      // sets the timeout
      window.setTimeout(() => token = '', expiresIn * 1000);
      // clears the token on timeout
      window.history.pushState('Access Token', null, '/');
      return token;
    } else {
      // scope redirect
      window.location = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
    }
  },
  search(term){
        this.accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
          {
            headers: {
              'Authorization': 'Bearer ' + this.accessToken,
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
          return tracks;
        });
  },
  savePlaylist(playlistName, trackURIs){
    if (playlistName === '' && trackURIs === '') {
      return;
    }
    let headers = {
      'Authorization': 'Bearer ' + this.accessToken,
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
          let id = jsonResponse.id;
          return id;
    })
    .then(user_id=>{
      console.log(user_id);
      //  create new playlist
      return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`,{
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: playlistName})})
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request Failed!');
      }, networkError => console.log(networkError.message))
      .then(jsonResponse => {
          console.log(jsonResponse);
          return {
            playlist_id: jsonResponse.id,
            user_id: user_id
          };
        });
    })
    .then(obj => {
      // add tracks to the playlist
      return fetch(`https://api.spotify.com/v1/users/${obj.user_id}/playlists/${obj.playlist_id}/tracks`,{
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
        return jsonResponse.id;
      });

    })

  }
};

export default Spotify;
