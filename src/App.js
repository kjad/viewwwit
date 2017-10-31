import React, { Component } from 'react';
import Navigation from './components/Navigation'
import MosaicContainer from './containers/MosaicContainer'
import SearchContainer from './containers/SearchContainer'
import './App.css';
import 'bulma/css/bulma.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation/>
        <SearchContainer/>
        <MosaicContainer/>
      </div>
    );
  }
}

export default App;
