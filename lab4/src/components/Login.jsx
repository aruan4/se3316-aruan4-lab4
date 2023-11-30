import {React, useState} from 'react';
import RegistrationPopup from './Registration';
import {auth} from '../Server/Firebase';

const Login = function(){ 
    //Registration logic
    const [isRegistrationOpen, setRegistrationOpen] = useState(false);
    let openReg = () => {
        setRegistrationOpen(true);
    }
    let closeReg = () => {
        setRegistrationOpen(false);
    }

    //Keep track of username input
    const [username, setUsername] = useState('');
    const handleUsername = (event) => {
        setUsername(event.target.value);
    }
    //Keep track of password input
    const [password, setPassword] = useState('');
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }
    //Check if logged in
    const [signedIn, setSignedIn] = useState(false);
    //Login logic
    const handleLogin = async () => {
        try {
            await auth.signInWithEmailAndPassword(username, password)
            
            setSignedIn(!signedIn);
          } catch (error) {
            
          }
    }

    return(
        <div className='flex justify-between items-center max-w-[1240px] mx-auto px-4 text-white'>
            <h1 className='text-4xl font-techFont text-[#12a93b]'>SuperheroDB</h1>
            <div className='m-2'>
                <input value={username} onChange={handleUsername} className='bg-[#1a1919] w-full rounded-md placeholder-white text-white' placeholder='email'></input>
                <hr className='bg-white border-1 border-white'></hr>
            </div>
            <div className='m-2'>
                <input value={password} onChange={handlePassword} className='bg-[#1a1919] w-full rounded-md placeholder-white text-white' placeholder='password'></input>
                <hr className='bg-white border-1 border-white'></hr>
            </div>
            <button onClick={handleLogin} className='bg-[#095a1f] hover:bg-[#107b2d] sm:w-[150px] w-[100px] rounded-md font-small font-techFont my-6 mx-2 py-3 px-6 text-white'>Login</button>
            {!isRegistrationOpen ? <button onClick={openReg} className='bg-[#095a1f] hover:bg-[#107b2d] sm:w-[150px] w-[100px] rounded-md font-small font-techFont my-6 mx-2 py-3 px-6 text-white'>Register</button> : null}
            <div>
            {isRegistrationOpen && (<RegistrationPopup onClose={closeReg} />)}
            </div>
        </div>
    );
}

export default Login;