import React, { Component } from 'react';
import TrackList from './../Tracklist/Tracklist';
import './SearchResults.css';

class SearchResults extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList onAdd={this.props.onAdd} tracks={this.props.searchResults} />
      </div>
    );
  }
}

export default SearchResults;
