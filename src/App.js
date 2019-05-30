import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class CurrentlyPlaying extends Component {
  render() {
    return(
      <div style={{width:'60%'}}>
        <img/>
        <h3 style={{color: 'blue'}}>Song Title</h3>
        <h4 style={{color: 'red'}}>Artist Name</h4>
        <h5 style={{color: 'red'}}>Album Name</h5>
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
  render() {
    return (
      <div className="App">
        <h2 >Welcome to Feel2une</h2>
        <CurrentlyPlaying/>
        <Mood/>
        <Mood/>
        <Mood/>
      </div>
    );
  }
}

export default App;
