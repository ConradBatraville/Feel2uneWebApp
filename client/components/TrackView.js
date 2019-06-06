import React, { Component } from 'react'
import {connect} from 'react-redux'

class TrackView extends Component {

render() {
  return (
      <div >
        { this.props.playlist.selectedTrack ?
        <div className='trackInfo'>
            <img width='350px' height="250px" src={this.props.playlist.selectedTrack.image} ></img>
            <div style={{'fontSize': '40px', 'color': 'white'}} className='trackInfo'>
          Song: {this.props.playlist.selectedTrack.songTitle} 
          <br/>
          Artist: {this.props.playlist.selectedTrack.artistName} 
          <br/>
          Album: {this.props.playlist.selectedTrack.albumName} 
          </div>
        </div>
        :
        <div >
            <img className='logo' src="https://i.ibb.co/wJb3z3Y/Feel2une-Logo.jpg" ></img>
        </div>
        }
      </div>
  )
 }
}


export default connect(null, null)(TrackView)
