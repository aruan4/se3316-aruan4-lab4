import React from 'react';

const Login = function(){ 
    return(
        <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
            <h1 className='text-4xl font-techFont text-[#12a93b]'>SuperheroDB</h1>
            <div className='m-2'>
                <input className=' bg-[#1a1919] w-full rounded-md placeholder-white text-white' placeholder='email'></input>
                <hr className='bg-white border-1 border-white'></hr>
            </div>
            <div className='m-2'>
                <input className=' bg-[#1a1919] w-full rounded-md placeholder-white text-white' placeholder='password'></input>
                <hr className='bg-white border-1 border-white'></hr>
            </div>
            <button className='bg-[#095a1f] hover:bg-[#107b2d] sm:w-[150px] w-[100px] rounded-md font-small font-techFont my-6 mx-2 py-3 px-6 text-white'>Login</button>
            <button className='bg-[#095a1f] hover:bg-[#107b2d] sm:w-[150px] w-[100px] rounded-md font-small font-techFont my-6 mx-2 py-3 px-6 text-white'>Register</button>
        </div>
    );
}

export default Login;