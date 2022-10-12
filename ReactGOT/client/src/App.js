import './App.css';
import React from 'react'
import People from './database/people/people'
import Navigation from './components/navigation/navigation'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatePerson from './components/createPerson/createPerson';
import Goods from './database/goods/goods';
import Item from './database/goods/item/item';
import TicTacToe from './components/tictactoe/tictactoe';
import Yarik from './components/Yarik/yarik';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/goods/:_id" element={<Item />} />
            <Route path="/createperson" element={<CreatePerson />} />
            <Route path="/creategoods" element={<CreatePerson />} />

            <Route path="/" element={<Yarik />} />
            <Route path="/people" element={<People />} />
            <Route path="/goods" element={<Goods />} />
            <Route path="/yarik" element={<Yarik />} />
            <Route path="/tictactoe" element={<TicTacToe />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
