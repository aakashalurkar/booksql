import React, { Component } from 'react';
import './App.css';
import RouteFile from './components/RouteFile'
import {BrowserRouter} from 'react-router-dom';


//App Component
class App extends Component {
  render() {
    return (
      //Use Browser Router to route to different pages
      <BrowserRouter>
        <div>
          {/* App Component Has a Child Component called Main*/}
          <RouteFile/>
        </div>
      </BrowserRouter>
    );
  }
}
//Export the App component so that it can be used in index.js
export default App;
