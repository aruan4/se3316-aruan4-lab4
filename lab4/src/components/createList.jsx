import React from 'react';

const createList = ({onClose}) => {
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
        let cleaned_heroes = heroes.split(",");
        let temp = [];
        for(let i in cleaned_heroes){
            temp.push(await fetch(`/api/superhero_info/searchid?id=${cleaned_heroes[i]}`));
        }

        const listDetails = {
            listName: listName,
            heroes: temp,
            description: description
        }
        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: {"Content-Type": 'application/json'},
                body: JSON.stringify(listDetails),
            });
        } catch (error) {
            
        }
    }
//Render the popup
    return (
        <div className='m-4 p-4 bg-[#242323] font-techFont grid items-center justify-center'>
            <div className="popup-content">
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
                <button onClick={create} className='bg-[#095a1f] hover:bg-[#107b2d] rounded-lg p-2 mx-1 mt-3'>Create</button>
                <button className='bg-[#095a1f] hover:bg-[#107b2d] rounded-lg p-2 mx-1 mt-3' onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default createList;