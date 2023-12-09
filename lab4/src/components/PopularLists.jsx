import {React, useState} from 'react';

let PopularLists = () => {
    const [listInfo, infoState] = useState(false);

    let handleInfo = () => {
        infoState(!listInfo);
    }

    return(
        <div className='px-16 py-12 m-8 bg-[#242323]'>
            <h1 className='flex justify-center text-[#12a93b] font-techFont text-2xl pb-6'>Popular lists</h1>
            <div className='grid grid-cols-3'>
                <div id='col1' className=' m-4 p-2 grid grid-rows-2 justify-center rounded-lg bg-[#0e7f2c]'>
                    <p>Public Lists</p>
                    <ul>
                        <li className='text-white hover:bg-[#3ab85c]' onClick={handleInfo}>temp</li>
                    </ul>
                </div>
                <div id='col2' className={listInfo ? 'm-4 p-2 grid grid-rows-2 justify-center col-span-2 rounded-lg bg-[#0e7f2c]' : 'hidden'}>
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