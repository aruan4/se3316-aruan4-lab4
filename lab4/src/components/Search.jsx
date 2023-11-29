import {React, useState} from 'react';
import {IoIosArrowDropdownCircle, IoIosArrowDropupCircle} from "react-icons/io";
import '../index.css';

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

    //Array initialization
    const [previewHeroes, updatePreviewHeroes] = useState([]);

    //Expand hero info
    const [expandedIndexes, updateExpandedIndexes] = useState([]);
    const handleExpand = (index) => {
    //Checks whether or not the clicked index is expanded
    const isExpanded = expandedIndexes.includes(index);
    //If item is in array, remove it from the array and return the rest, if it isn't, add it to the array
    updateExpandedIndexes(isExpanded ? expandedIndexes.filter((i) => i !== index) : [...expandedIndexes, index]);
    };

    //Handles any combination of field searches
    const fieldSearch = async () => {
        try {
            //Clear previous results
            updatePreviewHeroes([]);
            //Fetch call
            const response = await fetch(`http://localhost:5000/api/superhero_info/search?name=${name}&race=${race}&pb=${pb}&power=${power}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            //Iterate through dictionary
            updatePreviewHeroes(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return(
        <div className='px-16 py-8 m-8'>
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
                    <button onClick={fieldSearch} className='flex items-center justify-center bg-[#095a1f] hover:bg-[#107b2d] sm:w-[150px] w-[100px] rounded-md font-small font-techFont my-6 mx-2 py-3 px-6 text-white'>Search</button>
                </div>
            <div id='col3' className='flex font-techFont m-6 px-8 py-4 rounded-xl drop-shadow-lg'>
                    <ul className='text-white font-techFont grid grid-cols-3'>
                        {Object.values(previewHeroes).map((hero, index) => (
                            <div id='innerCol1' className='flex items-center justify-center bg-[#0e7f2c] rounded-lg p-2 m-4' key={index}>
                                <li className='p-2'>{expandedIndexes.includes(index) ? (
                                    <ul>
                                    {Object.entries(hero).map(([key, value]) => (
                                        <li key={key}>{`${key}: ${value}`}</li>
                                    ))}
                                    </ul>
                                ) : `${hero.name} --- ${hero.Publisher}`}</li>
                                {expandedIndexes.includes(index) ? <IoIosArrowDropupCircle size={30} className='icons' onClick={() => handleExpand(index)}/> 
                                : <IoIosArrowDropdownCircle size={30} className='icons' onClick={() => handleExpand(index)}/>}
                            </div>
                        ))}
                    </ul>
            </div>
        </div>
    );
}

export default Search;