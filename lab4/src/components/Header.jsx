import React from 'react';

const Header = () => {
    return(
        <div className='flex justify-between items-center max-w-[1240px] mx-auto px-4 text-white'>
            <h1 className='text-4xl font-techFont text-[#12a93b]'>SuperheroDB</h1>
            <a href='/'>
                <button className='bg-[#095a1f] hover:bg-[#107b2d] sm:w-[150px] w-[100px] rounded-md font-small font-techFont my-6 mx-2 py-3 px-6 text-white'>Logout</button>
            </a>
        </div>
    );
}

export default Header;