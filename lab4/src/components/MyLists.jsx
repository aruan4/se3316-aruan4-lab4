import {React, useState} from 'react';
import {IoIosArrowDropleftCircle, IoIosArrowDroprightCircle, IoIosEye, IoIosEyeOff, IoMdRefresh} from "react-icons/io";
import '../index.css';

let MyLists = () => {
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

    //Create list popup
    const [clist, setCList] = useState(false);
    const handleCList = () => {
        setCList(!clist);
    }
    //Handling public/private
    const [visibility, setVisibility] = useState(true);
    const handleVisibility = () => {
        setVisibility(!visibility);
    }

    //Input tracking
    const [listName, setListName] = useState('');
    const handleListName = (event) => {
        setListName(event.target.value);
    }    
    const [heroes, setHeroes] = useState([]);
    const handleHeroes = (event) => {
        setHeroes(event.target.value);
    }
    const [description, setDescription] = useState('');
    const handleDescription = (event) => {
        setDescription(event.target.value);
    }
    //Create list method
    const create = async () => {
        if(lists.length < 20){
            //Input validation
            const noWhitespaceRegex = RegExp(/^\S*$/);
            if(!noWhitespaceRegex.test(heroes)){
                alert('Please only use numbers and commas');
                return;
            }
            let vis = '';
            if(visibility)
                vis = 'Private';
            else
                vis = 'Public';
            //Split so we can get all hero ids
            let cleaned_heroes = heroes.split(",");
            let temp = [];
            //Create a list of heroes
            for(let i in cleaned_heroes){
                const response = await fetch(`/api/superhero_info/searchid?id=${cleaned_heroes[i]}`);
                const data = await response.json()
                temp.push(data);
            }
            //List details
            const listDetails = {
                listName: listName,
                heroes: temp,
                description: description,
                visibility: vis
            }
            //Create the list
            try {
                const response = await fetch('/api/users/lists/create', {
                    method: 'POST',
                    headers: {"Content-Type": 'application/json'},
                    body: JSON.stringify(listDetails),
                });
                if(response.ok){
                    let data = response.json();
                    updateLists([...lists, data]);
                    handleCList();
                }
            } catch (error) {
                console.log('Error creating list');
            }
        } else {
            alert('Max number of lists reached')
        }
    }

        //Getting user's lists
        const getList = async () => {
            try {
                //Clear previous results
                updateLists([]);
                //Fetch call
                const response = await fetch(`/api/users/lists/view`,{
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
    
    //Delete a list
    const deleteList = async (listName) => {
        const response = await fetch(`/api/users/lists/delete?listName=${listName}`,{
            method: 'DELETE'
        });
        if(response.ok){
            alert(`${listName} has been deleted`);
        } else {
            alert("Couldn't find the list");
        }
    }

    return(
        <div className='px-16 py-8 m-8 bg-[#242323]'>
            <div className='flex items-center justify-center'>
                <h1 className='flex justify-center items-center text-[#12a93b] text-2xl drop-shadow-lg p-6'>My Lists</h1>
                <button onClick={getList} className='flex items-center justify-center bg-[#095a1f] hover:bg-[#107b2d] sm:w-[150px] w-[100px] rounded-md font-small font-techFont my-6 mx-2 py-3 px-6 text-white'>Get my lists</button>
                <button onClick={handleCList} className='flex items-center justify-center bg-[#095a1f] hover:bg-[#107b2d] sm:w-[150px] w-[100px] rounded-md font-small font-techFont my-6 mx-2 py-3 px-6 text-white'>Create list</button>
            </div>
            <div>
            <div className='m-4 p-4 bg-[#242323] font-techFont grid items-center justify-center'>
            {clist ? <div>
                <h2 className='text-white'>Create a list</h2>
                <div>
                    <input onChange={handleListName} className='m-2 bg-[#242323] w-full rounded-md placeholder-white text-white' placeholder='list name'></input>
                    <hr className='bg-white border-1 border-white'></hr>
                </div>
                <div>
                    <textarea onChange={handleHeroes} className='m-2 bg-[#242323] w-full rounded-md placeholder-white text-white' placeholder='heroes (by id)'></textarea>
                    <hr className='bg-white border-1 border-white'></hr>
                </div>
                <div>
                    <textarea onChange={handleDescription} className='m-2 bg-[#242323] w-full rounded-md placeholder-white text-white' placeholder='description'></textarea>
                    <hr className='bg-white border-1 border-white'></hr>
                </div>
                <div className='flex items-center justify-evenly p-4'>
                    <IoIosEye size={30} color={!visibility ? 'white':''}/>
                    <IoIosEyeOff size={30} color={visibility ? 'white':''}/>
                    <IoMdRefresh size={30} className='icons' onClick={handleVisibility}/>
                </div>
                <button onClick={create} className='bg-[#095a1f] hover:bg-[#107b2d] rounded-lg p-2 mx-1 mt-3'>Create</button>
                <button className='bg-[#095a1f] hover:bg-[#107b2d] rounded-lg p-2 mx-1 mt-3'>Close</button>
            </div> :''}
        </div>
            </div>
            <div className='grid grid-cols-3'>
                <div id='col1' className=' m-4 p-2 grid justify-center rounded-lg bg-[#0e7f2c]'>
                    <ul>
                        <li className='justify-center flex items-center text-xl'>My Lists</li>
                        {lists.map((list, index) => (
                            <div key={index} className='flex items-center'>
                                <button className='bg-[#ffffff] hover:bg-[#c5c5c5] rounded-lg p-2 mx-1 mt-3' onClick={() => deleteList(list.listName)}>Delete</button>
                                <li className='text-white'>{list.listName}</li>
                                {expandedIndexes.includes(index) ? <IoIosArrowDropleftCircle className='icons' color='white' size={30} onClick={() => handleExpand(index)}/> 
                                : <IoIosArrowDroprightCircle className='icons' color='white' size={30} onClick={() => handleExpand(index)}/>}
                            </div>
                        ))}
                    </ul>
                </div>
                <div className='grid col-span-2 items-center justify-center bg-[#0e7f2c] rounded-lg p-2 m-4'>

                </div>
            </div>
        </div>
    );
}

export default MyLists;