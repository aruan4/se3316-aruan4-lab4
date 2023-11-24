import React from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Search from './components/Search';
import PopularLists from './components/PopularLists';

function App() {
  return (
    <div className='font-techFont'>
      <Login/>
      <Home/>
      <Search/>
      <PopularLists/>
    </div>
  );
}

export default App;
