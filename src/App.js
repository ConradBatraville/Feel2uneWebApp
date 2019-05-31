import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

let fakeServerData = {
  user: {
    name: 'Chanelle',
    tracks: [
      {
        name: 'Dedication (feat. Kendrick Lamar)',
        artist: 'Nipsey Hussle',
        album: 'Victory Lap',
        image: 'https://cdn-images-1.medium.com/max/1200/1*iEVGKX5GIcIRxztd9p2w5g.jpeg'
      },
      {
        name: 'From Home, to WOrk, and Back',
        artist: 'Tall Black Guy',
        album: '8 Miles to Moenart',
        image: 'https://f4.bcbits.com/img/a2731283108_10.jpg'
      }
    ]
  }
}

class CurrentlyPlaying extends Component {
  render() {
    console.log(this.props)
    return(
      <div style={{width:'60%'}}>
        <img style={{width: '70%'}} src={this.props.tracks[0].image} alt=''/>
        <h3 style={{color: 'blue'}}>{this.props.tracks && this.props.tracks[0].name}</h3>
        <h4 style={{color: 'red'}}>{this.props.tracks && this.props.tracks[0].artist}</h4>
        <h5 style={{color: 'red'}}>{this.props.tracks && this.props.tracks[0].album}</h5>
      </div>
    )
  }
}

class Mood extends Component {
  render() {
    return (
      <div >
        <button style={{width:'40%' }} onClick>Mood</button>
      </div>
    );
  }
}

class App extends Component {
  constructor(){
    super()
    this.state = {serverData: {}}
  }

  componentDidMount() {

  }
  render() {
    return (
      <div className="App">
        { this.state.serverData.user ?
        <div>
          <h1 style={{'fontSize': '50px'}}>
            Hey {this.state.serverData.user.name}, let's Feel2une !
          </h1>
          <CurrentlyPlaying tracks={this.state.serverData.user.tracks} />
          <Mood/>
          <Mood/>
          <Mood/>
        </div> : <button style={{color: 'green', padding: '80px', 'font-size': '50px', 'margin-top': '70px'}}>Sign in with Spotify</button>
        }
      </div>
    );
  }
}

export default App;

