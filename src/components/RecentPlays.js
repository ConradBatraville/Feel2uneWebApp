import React, { Component } from 'react';
import queryString from 'query-string'


class RecentPlays extends Component {
    constructor(){
        super()

        this.state = {
            mostRecentPlay: [{data: {items: []}}]
        }
    }


    componentDidMount() {
        let parsed = queryString.parse(window.location.search);
        let accessToken = parsed.access_token;

        fetch('https://api.spotify.com/v1/me/player/recently-played', {
            headers: {'Authorization': 'Bearer ' + accessToken}
        }).then(response => response.json())
        // // .then(data => console.log('recent plays', data))
        .then(data => this.setState({
            mostRecentPlay: data.items.map(item => ({
                trackName: item.track.name,
                artistName: item.track.album.artists[0].name,
                trackImage: item.track.album.images[0].url
            }))  
        }))
        // Track Name: data.items[0].track.name)
        // Artist Name: data.items[0].track.album.artists[0].name)
        // Track Image: data.items[0].track.album.images[0].url)
    }

    render() {
      return(
        <div className='recentPlaysList'>
          {/* <img style={{width: '50%'}} src={this.props.trackImage} alt=''/>
          <h3 style={{color: 'blue'}}>{this.props.trackName}</h3> */}
          {/* <h4 style={{color: 'red'}}>{this.props.artistName}</h4> */}
          {
            this.state.mostRecentPlay.map(recentPlay =>
            <div>
              <img style={{width: '15%'}} src={recentPlay.trackImage} alt=''/>
              <h3 style={{color: 'blue'}}>{recentPlay.trackName}</h3>
              <h4 style={{color: 'red'}}>{recentPlay.artistName}</h4>
            </div>
              )
          }
        </div>
      )
    }
  }

  export default RecentPlays