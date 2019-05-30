import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

let fakeServerData = {
  user: {
    name: 'Chanelle',
    track: 
      {
        name: 'Dedication (feat. Kendrick Lamar)',
        artist: 'Nipsey Hussle',
        album: 'Victory Lap'
      }
  }
}

class CurrentlyPlaying extends Component {
  render() {
    console.log(this.props)
    return(
      <div style={{width:'60%'}}>
        <img/>
        <h3 style={{color: 'blue'}}>{this.props.track && this.props.track.name}</h3>
        <h4 style={{color: 'red'}}>{this.props.track && this.props.track.artist}</h4>
        <h5 style={{color: 'red'}}>{this.props.track && this.props.track.album}</h5>
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
    setTimeout(() => this.setState({serverData: fakeServerData}), 1000)
  }
  render() {
    return (
      <div className="App">
        { this.state.serverData.user ?
        <div>
          <h1 style={{'font-size': '50px'}}>
            Hey{this.state.serverData.user.name}, let's Feel2une !
          </h1>
          <CurrentlyPlaying track={this.state.serverData.user.track} />
          <Mood/>
          <Mood/>
          <Mood/>
        </div> : <h1>Loading ....</h1>
        }
      </div>
    );
  }
}

export default App;
