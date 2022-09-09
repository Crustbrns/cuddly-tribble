import './App.css';
import React from 'react'
import People from './database/people'
import Navigation from './components/navigation'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Navigation />} />
            <Route path="/people" element={<People />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
