import React, { useState } from 'react';

const RegistrationPopup = () => {
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

  //Keep track of nickname input
  const [nickname, setNickname] = useState('');
  const handleNickname = (event) => {
    setNickname(event.target.value);
  }

  //Register account to database
  const handleRegistration = async () => {
    try {
      const credentials = {
        nickname: nickname,
        email: email,
        password: password
      }
      const response = await fetch(`http://localhost:5000/api/users/register`, {
        method: "POST",
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(credentials),
      });
      alert(response.data);
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  };

  return (
    <div className='m-4 p-4 bg-[#242323] font-techFont'>
      <div className="popup-content">
        <h2>Registration</h2>
        <div>
            <input value={nickname} onChange={handleNickname} className='m-2 bg-[#242323] w-full rounded-md placeholder-white text-white' placeholder='nickname'></input>
            <hr className='bg-white border-1 border-white'></hr>
        </div>
        <div>
            <input value={email} onChange={handleEmail} className='m-2 bg-[#242323] w-full rounded-md placeholder-white text-white' placeholder='email'></input>
            <hr className='bg-white border-1 border-white'></hr>
        </div>
        <div>
            <input type='password' value={password} onChange={handlePassword} className='m-2 bg-[#242323] w-full rounded-md placeholder-white text-white' placeholder='password'></input>
            <hr className='bg-white border-1 border-white'></hr>
        </div>
        <button className='bg-[#095a1f] hover:bg-[#107b2d] rounded-lg p-2 mx-1 mt-3' onClick={handleRegistration}>Register</button>
        <button className='bg-[#095a1f] hover:bg-[#107b2d] rounded-lg p-2 mx-1 mt-3'>Close</button>
      </div>
    </div>
  );
};

export default RegistrationPopup;
