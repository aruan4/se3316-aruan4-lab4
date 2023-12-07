import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Guestpage from './components/Guestpage';
import Userpage from './components/Userpage';

function App() {
  return (
    <div className='font-techFont'>
      <Router>
        <Routes>
          <Route path="/" element={<Guestpage/>}/>
          <Route path="/user" element={<Userpage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
