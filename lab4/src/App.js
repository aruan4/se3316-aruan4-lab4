import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Guestpage from './components/Guestpage';
import Userpage from './components/Userpage';
import PP from './components/PP';
import AUP from './components/AUP';
import DMCA from './components/DMCA';

function App() {
  return (
    <div className='font-techFont'>
      <Router>
        <Routes>
          <Route path="/" element={<Guestpage/>}/>
          <Route path="/user" element={<Userpage/>}/>
          <Route path="/PP" element={<PP/>}/>
          <Route path="/AUP" element={<AUP/>}/>
          <Route path="/DMCA" element={<DMCA/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
