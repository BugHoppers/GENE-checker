import React, { Component } from 'react';
import './App.css';
import FileOpener from './components/FileOpener';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>App</p>
        <FileOpener/>
      </div>
    );
  }
}

export default App;
