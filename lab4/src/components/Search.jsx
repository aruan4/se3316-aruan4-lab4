import {React, useState} from 'react';
import {IoIosArrowDropdownCircle} from "react-icons/io";

let Search = () => {
    //DOM
    //Hero search
    const [name, updateName] = useState('');
    let handleName = (event) => {
        updateName(event.target.value);
    }
    const [race, updateRace] = useState('');
    let handleRace = (event) => {
        updateRace(event.target.value);
    }
    const [pb, updatePb] = useState('');
    let handlePb = (event) => {
        updatePb(event.target.value);
    }
    const [power, updatePower] = useState('');
    let handlePower = (event) => {
        updatePower(event.target.value);
    }

    const [heroes, updateHeroes] = useState([]);

    const fieldSearch = async () => {
        try {
            //Clear previous results
            updateHeroes([]);
            //Fetch call
            const response = await fetch(`http://localhost:5000/api/superhero_info/search?name=${name}&race=${race}&pb=${pb}&power=${power}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            //Iterate through dictionary
            const newHeroes = Object.values(data).map(hero => `${hero.name} --- ${hero.Publisher}`);
            updateHeroes(newHeroes);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return(
        <div className='px-16 py-12 m-8'>
            <h1 className='flex justify-center text-[#12a93b] font-techFont text-2xl pb-6'>Search for a hero</h1>
                <div id='col1' className='grid grid-rows-5 bg-[#242323] px-8 py-4 justify-center'>
                    <p className='text-[#b5b5b5] font-techFont'>Choose search options:</p>
                    <div className='py-2'>
                        <input value={name} onChange={handleName} className=' bg-[#242323] w-full rounded-md placeholder-white text-white' placeholder='Search by name'></input>
                        <hr className='bg-white border-1 border-white'></hr>
                    </div>
                    <div className='py-2'>
                        <input value={race} onChange={handleRace} className=' bg-[#242323] w-full rounded-md placeholder-white text-white' placeholder='Search by race'></input>
                        <hr className='bg-white border-1 border-white'></hr>
                    </div>
                    <div className='py-2'>                
                        <input value={pb} onChange={handlePb} className=' bg-[#242323] w-full rounded-md placeholder-white text-white' placeholder='Search by publisher'></input>
                        <hr className='bg-white border-1 border-white'></hr>
                    </div>
                    <div className='py-2'>   
                        <input value={power} onChange={handlePower} className=' bg-[#242323] w-full rounded-md placeholder-white text-white' placeholder='Search by powers'></input>
                        <hr className='bg-white border-1 border-white'></hr>
                    </div>
                    <button onClick={fieldSearch} className='bg-[#095a1f] hover:bg-[#107b2d] sm:w-[150px] w-[100px] rounded-md font-small font-techFont my-6 mx-2 py-3 px-6 text-white'>Search</button>
                </div>
            <div id='col3' className='font-techFont bg-[#0e7f2c] m-6 px-8 py-4 rounded-xl drop-shadow-lg'>
                <div id='innerCol1' className='flex items-center justify-center'>
                    <ul className='text-white font-techFont'>
                        <li>Results:</li>
                        {heroes.map((hero, index) => (
                            <li className='p-2' key={index}>{hero}</li>
                        ))}
                    </ul>
                </div>
                <div id='innerCol2' className='flex items-center justify-center bg-inherit m-2'>
                    <IoIosArrowDropdownCircle color='white' size={30}/>
                </div>
            </div>
        </div>
    );
}

export default Search;