import {connect} from 'react-redux'
import React, { Component } from 'react';
import queryString from 'query-string'
import TrackView from './TrackView';
import { createPlaylistThunk, getAllTrackIdThunk, updateMoodThunk, selectedEnergyTrackThunk, selectedHappyTrackThunk,
  selectedDanceTrackThunk, selectedSadTrackThunk } from '../store/playlist'

class Spotify extends Component {
  constructor(){
    super()
    this.state = {user: {}, playlist: {giantPlaylist: []}}
    this.populateDatabase = this.populateDatabase.bind(this)
    this.energyHandler = this.energyHandler.bind(this)
    this.danceHandler  = this.danceHandler.bind(this)
    this.happyHandler = this.happyHandler.bind(this)
    this.sadHandler = this.sadHandler.bind(this)
    this.moreTunesToDataBaseManual = this.moreTunesToDataBaseManual.bind(this)
  }


  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;


    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      user: {
        name: data.display_name,
        otherUserData: data
      }
    }))
  }

  populateDatabase() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    this.state.playlist.giantPlaylist.map(track => {
      this.props.postTracks({image: track.track.album.images[0].url, spotifyId: track.track.id,
        artistName: track.track.artists[0].name, songTitle: track.track.name, albumName: track.track.album.name
      })

    fetch(`https://api.spotify.com/v1/audio-features/${track.track.id}`, {
       headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
      .then(data => this.moodSetter(data, track.track.id))
    })
  }
  
  moreTunesToDataBaseManual(){
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    fetch('https://api.spotify.com/v1/users/1240766765/playlists/5Tn5NiOELpuuWJFSpkQ8hV/tracks?limit=25', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      playlist: {
        giantPlaylist: data.items
      }
    }))
    
  }

  moodSetter(featureData, spotifyId){
    if ((featureData.energy >= 0.65) && (featureData.tempo >= 90 && featureData.tempo <= 160) && 
      (featureData.danceability >= 0.50 && featureData.danceability <= 0.75)){
      this.props.updateMood({mood: 'Dance-y', spotifyId})
    } else if (featureData.valence >= 0.55 && featureData.valence <= 1) {
      this.props.updateMood({mood: 'Positive Vibes', spotifyId})
    } else if (featureData.tempo >= 170) {
      this.props.updateMood({mood: 'Energy Boost', spotifyId})
    } else if (featureData.tempo >= 88 && featureData.tempo <= 146){
      this.props.updateMood({mood: 'Mellow Mood', spotifyId})
    }
  }

  energyHandler() {
    this.props.selectedEnergyTrack()
  }

  danceHandler() {
    this.props.selectedDanceTrack()
  }

  happyHandler() {
    this.props.selectedHappyTrack()
  }

  sadHandler() {
    this.props.selectedSadTrack()
  }

  trackIds(){
    this.props.getTrackIds();
  }
  
  render() {
    return (
      <div >
      <nav style={{'fontSize': '20px', 'color': 'red'}}  className='navbar is-danger'>
        <div className='nav-left' >
          <a href='https://www.linkedin.com/in/conradbatraville/' className='nav-item'>
           <span className='icon'>
              <i className='fab fa-linkedin'></i>
           </span>
          </a>
        </div>
        <div className='nav-center' >
          <a href='https://github.com/theradistCoder' className='nav-item'>
           <span className='icon'>
              <i className='fab fa-github'></i>
           </span>
          </a>
        </div>
        <div className='nav-right'>
          <a href='https://www.spotify.com' className='nav-item'>
           <span className='icon'>
              <i className='fab fa-spotify'></i>
           </span>
          </a>
        </div>
      </nav>
      { this.state.user.name ?
      <div>
        <h1 style={{'fontSize': '35px', 'color': 'red'}} >
          Hey {this.state.user.name.toUpperCase()}, pick a mood:
        </h1>
        <div style={{"marginTop":"60px"}}></div>
        <div style={{"padding":"14px"}} className="columns">
          <button style={{'color': 'red'}} className="column button is-danger is-large is-outlined is-rounded" type='button' onClick={this.energyHandler}>Energy Boost</button>
          <button style={{'color': 'yellow'}} className="column button is-warning is-large is-outlined is-rounded" type='button' onClick={this.happyHandler}>Positive Vibes</button>
          <button style={{'color': 'blue'}} className="column button is-info is-large is-outlined is-rounded" type='button' onClick={this.danceHandler}>Dance-y</button>
          <button style={{'color': 'green'}} className="column button is-success is-large is-outlined is-rounded" type='button' onClick={this.sadHandler}>Mellow Mood</button>
        </div>
        <TrackView userName={this.state.user.name} playlist={this.props.selectedTrack} />
      </div> 
       : 
       <div>
       <div >
       <img className='logo' src="https://i.ibb.co/wJb3z3Y/Feel2une-Logo.jpg" alt="Feel2une-Logo"></img>
      </div>
      <div className='notification is-warning' style={{"marginTop":"35px", "marginBottom": "50px", 'fontSize': '30px', 'color': 'black'}}>
        Feel2une is a song recommender that makes use of Spotify's web API's and track analysis data to help users chose songs within the mood they'd like to feel.
      </div>
       <button type='button' id='my_centered_buttons' className="column button is-success is-large is-outlined is-rounded" onClick={() => window.location ='http://localhost:8888/login'}
       style={{padding: '15px', 'fontSize': '50px', 'marginTop': '5px'}}>Sign in with Spotify</button>
       </div>
      }
    </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedTrack: state.playlist.selectedTrack
})

const mapDispatchToProps = (dispatch) => {
  return {
      postTracks: (tracks) => dispatch(createPlaylistThunk(tracks)),
      getTrackIds: (trackIds) => dispatch(getAllTrackIdThunk(trackIds)),
      updateMood: (track) => dispatch(updateMoodThunk(track)),
      selectedEnergyTrack: (track) => dispatch(selectedEnergyTrackThunk(track)),
      selectedHappyTrack: (track) => dispatch(selectedHappyTrackThunk(track)),
      selectedSadTrack: (track) => dispatch(selectedSadTrackThunk(track)),
      selectedDanceTrack: (track) => dispatch(selectedDanceTrackThunk(track))
  
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Spotify)

