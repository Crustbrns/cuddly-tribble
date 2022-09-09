import './App.css';
import React from 'react'
import People from './database/people'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <People/>
      </header>
    </div>
  );
}

export default App;
