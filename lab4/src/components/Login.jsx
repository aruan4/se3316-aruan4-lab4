import React from 'react';

const Login = function(){ 
    return(
        <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
            <h1 className='w-full text-4xl font-techFont text-[#12a93b]'>SuperheroDB</h1>
            <input className='mx-2 rounded-md' placeholder='email'></input>
            <input className='mx-2 rounded-md' placeholder='password'></input>
            <button className='bg-[#095a1f] hover:bg-[#107b2d] sm:w-[150px] w-[100px] rounded-md font-small font-techFont my-6 mx-2 py-3 px-6 text-white'>Login</button>
            <button className='bg-[#095a1f] hover:bg-[#107b2d] sm:w-[150px] w-[100px] rounded-md font-small font-techFont my-6 mx-2 py-3 px-6 text-white'>Register</button>
        </div>
    );
}

export default Login;