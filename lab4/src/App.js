import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Guestpage from './components/Guestpage';
import Userpage from './components/Userpage';
import PP from './components/PP';
import AUP from './components/AUP';

function App() {
  return (
    <div className='font-techFont'>
      <Router>
        <Routes>
          <Route path="/" element={<Guestpage/>}/>
          <Route path="/user" element={<Userpage/>}/>
          <Route path="/PP" element={<PP/>}/>
          <Route path="/AUP" element={<AUP/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
