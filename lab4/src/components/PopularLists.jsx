import {React, useState} from 'react';
import {IoIosArrowDropleftCircle, IoIosArrowDroprightCircle} from "react-icons/io";

let PopularLists = () => {
    //Lists
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
            const response = await fetch(`/api/users/lists/viewall`,{
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
        <div className='px-16 py-12 m-8 bg-[#242323]'>
            <div className='flex justify-center items-center'>
                <h1 className='text-[#12a93b] font-techFont text-2xl pb-6 flex justify-center items-center'>Popular lists</h1>
                <button onClick={getList} className='bg-[#095a1f] hover:bg-[#107b2d] rounded-lg p-2 mx-1 mt-3 flex justify-center items-center'>Get my lists</button>
            </div>
            <div className='grid grid-cols-3'>
                <div id='col1' className=' m-4 p-2 grid grid-rows-2 justify-center rounded-lg bg-[#0e7f2c]'>
                    <p>Public Lists</p>
                    <ul>
                        {lists.map((list, index) => (
                            <div key={index} className='flex items-center'>
                                <li className='text-white'>{list.listName}</li>
                                {expandedIndexes.includes(index) ? <IoIosArrowDropleftCircle className='icons' color='white' size={30} onClick={() => handleExpand(index)}/> 
                                : <IoIosArrowDroprightCircle className='icons' color='white' size={30} onClick={() => handleExpand(index)}/>}
                            </div>
                        ))}
                    </ul>
                </div>
                <div id='col2' className={'m-4 p-2 grid grid-rows-2 justify-center col-span-2 rounded-lg bg-[#0e7f2c]'}>
                    <p>temp list name</p>
                    <ul>
                        <li>heroes</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PopularLists;