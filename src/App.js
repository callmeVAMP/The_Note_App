import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import Listdo from './Pages/To-do-list';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Listdo />} />
          
          {/* <Route path='/listdo' element={<Listdo />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
