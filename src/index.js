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

let store = createStore(
  reducer,
  {
    subreddit: 'pics',
    loading: true,
    posts: [
      { id: 1, foo: 'bar' },
      { id: 2, foo: 'baz' },
    ]
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
  , document.getElementById('root')
);
registerServiceWorker();
