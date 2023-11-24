import React, { useState } from 'react';

const RegistrationPopup = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = () => {
    // Implement your registration logic here
    console.log('Registering user:', username);
    // Close the pop-up after registration
    onClose();
  };

  return (
    <div className='m-4 p-4 bg-[#242323] font-techFont'>
      <div className="popup-content">
        <h2>Registration</h2>
        <div>
            <input className='m-2 bg-[#242323] w-full rounded-md placeholder-white text-white' placeholder='nickname'></input>
            <hr className='bg-white border-1 border-white'></hr>
        </div>
        <div>
            <input className='m-2 bg-[#242323] w-full rounded-md placeholder-white text-white' placeholder='email'></input>
            <hr className='bg-white border-1 border-white'></hr>
        </div>
        <div>
            <input type='password' className='m-2 bg-[#242323] w-full rounded-md placeholder-white text-white' placeholder='password'></input>
            <hr className='bg-white border-1 border-white'></hr>
        </div>
        <button className='bg-[#095a1f] hover:bg-[#107b2d] rounded-lg p-2 mx-1 mt-3' onClick={handleRegistration}>Register</button>
        <button className='bg-[#095a1f] hover:bg-[#107b2d] rounded-lg p-2 mx-1 mt-3' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RegistrationPopup;
