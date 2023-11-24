import {React, useState} from 'react';

let Search = () => {
    //DOM
    //Hero search
    const [name, updateName] = useState('');
    let handleName = (event) => {
        updateName(event.target.value);
    }

    const [heroes, updateHeroes] = useState([]);

    let nameSearch = async () => {
        await fetch(`api/superhero_info/search/${name}`)
        // .then(res => {alert(res.json())})
        .then(data => {
            alert(data);
            for(let property in data){
                let newHero = `${data[property].name}\n${data[property].publisher}`
                //Call update heroes ...heroes gets all elements in previous array, adds 2nd parameter
                updateHeroes([...heroes, newHero]);
            }
        })
    }

    return(
        <div className='px-16 py-12 m-8 bg-[#242323]'>
            <h1 className='flex justify-center text-[#12a93b] font-techFont text-2xl pb-6'>Search for a hero</h1>
            <div id='searchOptions' className='grid grid-cols-3 justify-evenly'>
                <div id='col1' className='grid grid-rows-5 justify-center'>
                    <p className='text-white'>Choose search options:</p>
                    <div>
                        <input type="checkbox" value='name' className='m-2' defaultChecked={true}></input>
                        <label className='text-white'>Name</label>
                    </div>
                    <div>
                        <input type="checkbox" value='race' className='m-2'></input>
                        <label className='text-white'>Race</label>
                    </div>
                    <div>
                        <input type="checkbox" value='publisher' className='m-2'></input>
                        <label className='text-white'>Publisher</label>
                    </div>
                    <div>
                        <input type="checkbox" value='powers' className='m-2'></input>
                        <label className='text-white'>Powers</label>
                    </div>
                </div>
                <div id='col2' className='grid grid-cols-2 justify-center items-center'>
                    <div id='innerCol1' className='mx-2'>
                        <input value={name} onChange={handleName} className='h-[25%] bg-[#242323] w-full rounded-md placeholder-white text-white' placeholder='Search content'></input>
                        <hr className='bg-white border-1 border-white'></hr>
                    </div>
                    <div id='innerCol2' className='mx-2 flex items-center justify-center'>
                        <button onClick={nameSearch}
                        className='bg-[#095a1f] hover:bg-[#107b2d] w-[100px] rounded-md font-small font-techFont my-6 mx-2 py-3 px-6 text-white'>Search</button>
                    </div>
                </div>
                <div id='col3' className='grid grid-rows-2 font-techFont bg-[#0e7f2c] m-6 rounded-xl drop-shadow-lg'>
                    <div id='innerCol1' className='flex items-center justify-center'>
                        <ul className='text-white font-techFont'>
                            {heroes.map((hero, index) => (
                                <li className='p-2' key={index}>{hero}</li>
                            ))}
                        </ul>
                    </div>
                    <div id='innerCol2' className='flex items-center justify-center'>
                        <button className='bg-[#0e7f2c] hover:bg-[#107b2d] w-full'>Expand</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;