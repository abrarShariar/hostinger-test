import React from 'react';
import './App.css';
import DataTable from './DataTable';

class App extends React.Component {
  render () {
    return (
      <div className="App">
        <h1>New York Times Bestsellers</h1>
        <DataTable/>
      </div>
    )
  }
}

export default App;
