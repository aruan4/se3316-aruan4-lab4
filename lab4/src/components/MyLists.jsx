import {React, useState} from 'react';
import {IoIosArrowDropdownCircle, IoIosArrowDroprightCircle} from "react-icons/io";
import '../index.css';

let MyLists = () => {
    const [listInfo, infoState] = useState(false);

    let handleInfo = () => {
        infoState(!listInfo);
    }

    const [lists, updateLists] = useState(['Placeholder']);

    return(
        <div className='px-16 py-8 m-8 bg-[#242323]'>
            <h1 className='flex justify-center text-[#12a93b] text-2xl pb-6 drop-shadow-lg'>My Lists</h1>
            <div className='grid grid-cols-3'>
                <div id='col1' className=' m-4 p-2 grid grid-rows-2 justify-center rounded-lg bg-[#0e7f2c]'>
                    <ul>
                        <li className='justify-center flex items-center'>My Lists</li>
                        {lists.map((list, index) => (
                            <li className='text-white p-2 flex items-center justify-center' key={index}>{list} <IoIosArrowDroprightCircle size={20} className='icons' onClick={handleInfo}/></li>
                        ))}
                    </ul>
                </div>
                <div id='col2' className={listInfo ? 'm-4 p-2 grid grid-rows-2 justify-center col-span-2 rounded-lg bg-[#0e7f2c]' : 'translate-x-[100%]'}>
                    <ul className='relative'>
                        
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default MyLists;