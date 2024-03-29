import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';
import RootReducer from "./reducers";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import promise from "redux-promise";

import RootReducer from "./reducers";
//middleware settings
// To resolve promise to store we use apply
const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStore(RootReducer, composePlugin(applyMiddleware(promise)));

//App Component
class App extends Component {
  render() {
    return (

      <Provider store={store}>
      //Use Browser Router to route to different pages
      <BrowserRouter>
        <div>
          {/* App Component Has a Child Component called Main*/}
          <Main/>
        </div>
      </BrowserRouter>
      </Provider>
    );
  }
}
//Export the App component so that it can be used in index.js
export default App;
