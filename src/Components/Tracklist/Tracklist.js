import React from 'react';
import './Tracklist.css';
import Track from './../Track/Track';

class Tracklist extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="TrackList">
          {this.props.tracks.map(track =>{
            return (
              <Track
                onRemove={this.props.onRemove}
                onAdd={this.props.onAdd}
                key={track.id}
                track={track} />);
          })}
      </div>
    );
  }
}

export default Tracklist;
