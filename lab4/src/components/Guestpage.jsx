import React from 'react';
import Home from './Home';
import Login from './Login';
import Search from './Search';
import PopularLists from './PopularLists';

const Guestpage = () => {
    return(
        <div>
            <Login/>
            <Home/>
            <Search/>
            <PopularLists/>
        </div>
    );
}

export default Guestpage;