import {React, useState} from 'react';
import {IoIosArrowDropleftCircle, IoIosArrowDroprightCircle} from "react-icons/io";
import '../index.css';

let MyLists = () => {
    const [listInfo, infoState] = useState(false);

    let handleInfo = () => {
        infoState(!listInfo);
    }

    //Lists
    const [names, updateNames] = useState([]);
    const [lists, updateLists] = useState([]);
    //Expand hero info
    const [expandedIndexes, updateExpandedIndexes] = useState([]);
    const handleExpand = (index) => {
    //Checks whether or not the clicked index is expanded
    const isExpanded = expandedIndexes.includes(index);
    //If item is in array, remove it from the array and return the rest, if it isn't, add it to the array
    updateExpandedIndexes(isExpanded ? expandedIndexes.filter((i) => i !== index) : [...expandedIndexes, index]);
    };

    //Getting user's lists
    const getList = async () => {
        try {
            //Clear previous results
            updateLists([]);
            //Fetch call
            const response = await fetch(`http://localhost:5000/api/users/lists/view`,{
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            //Organize the data into a json object
            const data = await response.json();
            //Add to lists and add names to names list
            updateLists(data);
            displayList();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    //Display user's lists and contents
    const displayList = async () => {
        const listNames = [];
        for(let property in lists){
            if(property === 'listName'){
                listNames.push(lists[property]);
            }
        }
        return listNames;
    }

    return(
        <div className='px-16 py-8 m-8 bg-[#242323]'>
            <div className='flex items-center justify-center'>
                <h1 className='flex justify-center items-center text-[#12a93b] text-2xl drop-shadow-lg p-6'>My Lists</h1>
                <button onClick={getList} className='flex items-center justify-center bg-[#095a1f] hover:bg-[#107b2d] sm:w-[150px] w-[100px] rounded-md font-small font-techFont my-6 mx-2 py-3 px-6 text-white'>Get my lists</button>
            </div>
            <div className='grid grid-cols-3'>
                <div id='col1' className=' m-4 p-2 grid grid-rows-2 justify-center rounded-lg bg-[#0e7f2c]'>
                    <ul>
                        <li className='justify-center flex items-center text-xl'>My Lists</li>
                        {lists.map((maow, index) => (
                            <div key={index} className='flex items-center'>
                                <li className='text-white'>{maow.listName}</li>
                                {expandedIndexes.includes(index) ? <IoIosArrowDropleftCircle className='icons' color='white' size={30} onClick={() => handleExpand(index)}/> 
                                : <IoIosArrowDroprightCircle className='icons' color='white' size={30} onClick={() => handleExpand(index)}/>}
                            </div>
                        ))}
                    </ul>
                </div>
                {/*Object.values(lists).map((hero, index) =>{
                    <div id='col2' className={expandedIndexes.includes(index) ? 'm-4 p-2 grid grid-rows-2 justify-center col-span-2 rounded-lg bg-[#0e7f2c]' : 'translate-x-[100%]'}>
                        <ul className='relative'>
                        
                        </ul>
                </div>
                })*/}
            </div>
        </div>
    );
}

export default MyLists;