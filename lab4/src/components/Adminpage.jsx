import React from 'react';
import HomeUser from './HomeUser';
import MyLists from './MyLists';
import Search from './Search';
import PopularLists from './PopularLists';
import Header from './Header';

const Adminpage = () => {
    return(
        <div>
            <Header/>
            <HomeUser/>
            <Search/>
            <PopularLists/>
            <MyLists/>
            <div className='flex items-center justify-evenly py-12'>
                <p className='text-white'>admin</p>
                <a href='/PP' className='text-white'>Privacy Policy</a>
                <a href='/AUP' className='text-white'>Acceptable Use Policy</a>
                <a href='/DMCA' className='text-white'>DMCA Policy</a>
            </div>
        </div>
    );
}

export default Adminpage;