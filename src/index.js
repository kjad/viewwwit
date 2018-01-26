import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers'
import { BrowserRouter as Router, Route } from 'react-router-dom'

let rootEl = document.getElementById('root')

let store = createStore(
  reducer,
  {
    subreddit: null,
    loading: true,
    posts: []
  },
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware
    )
  )
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>
  , rootEl
);
registerServiceWorker();
