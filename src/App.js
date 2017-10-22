import React, { Component } from 'react';
import Navigation from './navigation/Navigation'
import Mosaic from './mosaic/Mosaic'
import './App.css';
import 'bulma/css/bulma.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation/>
        <Mosaic/>
      </div>
    );
  }
}

export default App;
