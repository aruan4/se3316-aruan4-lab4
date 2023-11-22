import React from 'react';

let Search = () => {
    return(
        <div className='px-16 py-12 m-8 bg-[#242323]'>
            <h1 className='flex justify-center text-[#12a93b] font-techFont text-2xl py-6'>Search for a hero</h1>
            <div id='searchOptions' className='grid grid-cols-3 justify-evenly'>
                <div id='col1' className='grid grid-rows-5 justify-center'>
                    <p className='text-white'>Choose search options:</p>
                    <div>
                        <input type="checkbox" className='m-2'></input>
                        <label className='text-white'>Name</label>
                    </div>
                    <div>
                        <input type="checkbox" className='m-2'></input>
                        <label className='text-white'>Race</label>
                    </div>
                    <div>
                        <input type="checkbox" className='m-2'></input>
                        <label className='text-white'>Publisher</label>
                    </div>
                    <div>
                        <input type="checkbox" className='m-2'></input>
                        <label className='text-white'>Powers</label>
                    </div>
                </div>
                <div id='col2' className='flex items-center justify-start translate-x-[-0%]'>
                    <input className='h-[25%] w-full rounded-md'></input>
                    <button className='bg-[#095a1f] hover:bg-[#107b2d] sm:w-[150px] w-[100px] rounded-md font-small font-techFont my-6 mx-2 py-3 px-6 text-white'>Search</button>
                </div>
                <div id='col3' className='grid grid-rows-2 font-techFont bg-[#0e7f2c] m-6 rounded-xl drop-shadow-lg'>
                    <div id='innerCol1' className='flex items-center justify-center'>
                        <p className='text-white'>Placeholder Info</p>
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