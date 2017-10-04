import React from 'react';
import './App.css';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import {Profile} from './Profile';
import Gallery from './Gallery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: []
    }
  }
  search() {
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
    var accessToken = 'BQCUuyigmntK99C6efzcqTofIrArI2VheA3T6xJsv7l8AfpWfDu83p0Z7Wjiad0PkCxdNvL3zLDh31KLbPJlZswSfJ1eb3JCOvaivKUTZDL3nDBhWhff1TerGT4dXL3c1IB5yGuCpqVSrN_Ve3b_r8PkmbpTMlM'


    var myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, myOptions).then(response => response.json()).then(json => {
      const artist = json.artists.items[0];
      this.setState({artist});
      const artistId = artist.id;
      FETCH_URL = ALBUM_URL + artistId + '/top-tracks?country=US&';
      fetch(FETCH_URL, myOptions).then(response => response.json()).then(json => {
        console.log('artist', json);
        const { tracks }= json;
        this.setState({tracks})
      })
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-title">Music Master</div>
        <FormGroup>
          <InputGroup>
            <FormControl type="text" placeholder="search for an artist" value={this.state.query} onChange={event => {
              this.setState({query: event.target.value})
            }} onKeyPress={event => {
              if (event.key === 'Enter') {
                this.search();
              }
            }}/>
            <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist !== null
          ?
            <div>
              <Profile artist={this.state.artist}/>
              <Gallery
                tracks={this.state.tracks}
              />
            </div>
          : <div></div>
        }
      </div>
    )
  }
}

export default App;
