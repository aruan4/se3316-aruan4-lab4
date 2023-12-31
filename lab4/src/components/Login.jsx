import {React, useState} from 'react';
import RegistrationPopup from './Registration';
import { useNavigate } from 'react-router-dom';

const Login = function(){ 
    //Registration logic
    const [isRegistrationOpen, setRegistrationOpen] = useState(false);
    let openReg = () => {
        setRegistrationOpen(true);
    }
    let closeReg = () => {
        setRegistrationOpen(false);
    }

    //Keep track of email input
    const [email, setEmail] = useState('');
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    //Keep track of password input
    const [password, setPassword] = useState('');
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    //Redirect
    const naviagte = useNavigate();

    //Login
    const login = async () => {
        //Input validation
        if(email === '' || password === ''){
            alert('Fill in all fields');
            return;
        }
        try {
            const credentials = {
                email: email,
                password: password,
            }
            const response = await fetch(`/api/users/login`, {
                method: 'POST',
                headers: {"Content-Type": 'application/json'},
                body: JSON.stringify(credentials),
            });
            if(response.ok){
                const response2 = await fetch(`/api/users/check`, {
                    method: 'POST',
                    headers: {"Content-Type": 'application/json'},
                    body: JSON.stringify(credentials),
                })
                if(response2.ok){
                    naviagte('/admin');
                } else{
                    naviagte('/user');
                }
            }
            else
                alert(response.statusText);
        } catch (error){
            alert('Incorrect credentials');
        }
    }

    //Password reset
    const reset = async () => {
        try {
            let response = await fetch(`/api/users/reset?email=${email}`, {
                method: 'POST'
            });
            if(response.ok)
                alert('Email has been sent!');
        } catch (error) {
            alert('Myeh');
        }
    }

    return(
        <div className='flex justify-between items-center max-w-[1240px] mx-auto px-4 text-white'>
            <h1 className='text-4xl font-techFont text-[#12a93b]'>SuperheroDB</h1>
            <div className='m-2'>
                <input value={email} onChange={handleEmail} className='bg-[#1a1919] w-full rounded-md placeholder-white text-white' placeholder='email'></input>
                <hr className='bg-white border-1 border-white'></hr>
            </div>
            <div className='m-2'>
                <input type='password' value={password} onChange={handlePassword} className='bg-[#1a1919] w-full rounded-md placeholder-white text-white' placeholder='password'></input>
                <hr className='bg-white border-1 border-white'></hr>
            </div>
            <button onClick={login} className='bg-[#095a1f] hover:bg-[#107b2d] sm:w-[100px] w-[75px] flex justify-center rounded-md font-small font-techFont my-6 mx-2 py-3 px-6 text-white'>Login</button>
            <button onClick={reset} className='bg-[#095a1f] hover:bg-[#107b2d] sm:w-[100px] w-[75px] flex justify-center rounded-md font-small font-techFont my-6 mx-2 py-3 px-6 text-white'>Reset Password</button>
            {!isRegistrationOpen ? <button onClick={openReg} className='bg-[#095a1f] hover:bg-[#107b2d] sm:w-[100px] w-[75px] flex justify-center rounded-md font-small font-techFont my-6 mx-2 py-3 px-6 text-white'>Register</button> : null}
            <div>
                {isRegistrationOpen && (<RegistrationPopup onClose={closeReg} />)}
            </div>
        </div>
    );
}

export default Login;