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

let rootEl = document.getElementById('root')

let store = createStore(
  reducer,
  {
    subreddit: 'pics',
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
    <App />
  </Provider>
  , rootEl
);
registerServiceWorker();
