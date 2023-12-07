import React from 'react';
import HomeUser from './HomeUser';
import MyLists from './MyLists';
import Search from './Search';
import PopularLists from './PopularLists';
import Header from './Header';

const Userpage = () => {
    return(
        <div>
            <Header/>
            <HomeUser/>
            <Search/>
            <PopularLists/>
            <MyLists/>
        </div>
    );
}

export default Userpage;