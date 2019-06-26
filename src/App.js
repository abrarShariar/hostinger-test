import React from 'react';
import './App.css';
import DataTable from './DataTable';
import { Container, Header } from 'semantic-ui-react';

class App extends React.Component {
  render () {
    return (
      <div className="App">
        <Container textAlign="center">
          <Header size="huge" style={{ marginTop: '20px', marginBottom: '20px' }}>
            New York Times Bestsellers
          </Header>
        </Container>
        <Container fluid>
          <DataTable/>
        </Container>
      </div>
    )
  }
}

export default App;
