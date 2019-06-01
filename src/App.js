import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import queryString from 'query-string'
import RecentPlays from './components/RecentPlays'

// class Mood extends Component {
//   render() {
//     return (
//       <div >
//         <button style={{width:'40%' }} onClick>Mood</button>
//       </div>
//     );
//   }
// }

class App extends Component {
  constructor(){
    super()
    // this.state = {serverData: {user: {name: null, mostRecentPlay: null}}}
    this.state = {user: {}, giantPlaylist: []}

  }

  componentDidMount() {
  let parsed = queryString.parse(window.location.search);
  let accessToken = parsed.access_token;

  fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      user: {
        name: data.display_name
      }
    }))
  }

  happyHandler(){

  }

  getGiantPlaylist(){
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    
    fetch('https://api.spotify.com/v1/playlists/4rJc2V8sx6qEFlU2eQU1vd', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
      .then(data => console.log('getGiantPlaylist', data.tracks.items[0].track))
  //   .then(data => this.setState({
  //     user: {
  //       name: data.display_name
  //     }
  //   }))
  }

  render() {
    // let recentPlaysToRender = 
    //   this.state.user &&
    //   this.state.mostRecentPlay
    //     ? this.state.mostRecentPlay.map(recentPlay => ({
    //       trackName: recentPlay.trackName,
    //       artistName: recentPlay.artistName,
    //       trackImage: recentPlay.trackImage
    //     })

    //       ) : []
    return (
      <div className="App">
        { this.state.user.name ?
        <div>
          <h1 style={{'fontSize': '50px', 'color': 'red'}}>
            Hey {this.state.user.name}, let's Feel2une !
          </h1>
              <RecentPlays/>
              <button onClick={this.happyHandler}>Happy</button>
              <button onClick={this.getGiantPlaylist}>Get Giant Playlist</button>
              
              {/* <Mood/> */}
        </div> : <button onClick={() => window.location ='http://localhost:8888/login'}
         style={{color: 'green', padding: '80px', 'fontSize': '50px', 'marginTop': '70px'}}>Sign in with Spotify</button>
        }
      </div>
    );
  }
}

export default App;

