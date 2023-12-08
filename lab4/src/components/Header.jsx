import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    //Redirect logic
    const navigate = useNavigate();

    //Logout
    const logout = async () => {
        try {
            const response = await fetch(`/api/users/logout`, {
                method: 'POST',
                headers: {"Content-Type": 'application/json'},
            });
            if(response.ok)
                navigate('/')
        } catch (error){
            console.log('Error logging out user');
        }
    }

    return(
        <div className='flex justify-between items-center max-w-[1240px] mx-auto px-4 text-white'>
            <h1 className='text-4xl font-techFont text-[#12a93b]'>SuperheroDB</h1>
            <button onClick={logout} className='bg-[#095a1f] hover:bg-[#107b2d] sm:w-[150px] w-[100px] rounded-md font-small font-techFont my-6 mx-2 py-3 px-6 text-white'>Logout</button>
        </div>
    );
}

export default Header;