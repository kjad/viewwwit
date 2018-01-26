import React, { Component } from 'react';
import Navigation from './components/Navigation'
import MosaicContainer from './containers/MosaicContainer'
import SearchContainer from './containers/SearchContainer'
import './App.css';
import 'bulma/css/bulma.css'
import { Route } from 'react-router-dom'
import { changeSubreddit } from './actions'
import { connect } from 'react-redux'

class App extends Component {

  // This initializes the state of the application to the subreddit in the url
  componentWillMount() {
    let subreddit = this.props.location.pathname.split('/')[2]
    if (subreddit) {
      this.props.changeSubreddit(subreddit);
    }
  }

  render() {
    return (
      <div className="App">
        <Navigation/>
        <SearchContainer/>
        <Route path="/r/:subreddit" component={MosaicContainer}/>
      </div>
    );
  }
}

export default connect(null, {
  changeSubreddit: changeSubreddit
})(App)
