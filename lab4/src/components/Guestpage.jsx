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
            <div className='flex items-center justify-evenly py-12'>
                <a href='/PP' className='text-white'>Privacy Policy</a>
                <a href='/AUP' className='text-white'>Acceptable Use Policy</a>
            </div>
        </div>
    );
}

export default Guestpage;