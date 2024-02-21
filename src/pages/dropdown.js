import React from 'react'

export default function dropdown() {
  return (
    <div className='flex justify-center items-center h-[100vh]'>
       <div className='flex  m-0 p-0 items-center relative'>
       <div className=' '>
        <ul className='flex flex-col gap-x-3 bg-black text-white p-0 m-0 text-center dropdownIII  w-[200px]'>
            <li>Home</li>
            <li>Shop</li>
            <li>Office</li>
            <li>Office</li>
            <li>Office</li>
        </ul>
       </div>
       <button className='border px-3 py-2 rounded-sm'>Drop Up</button>
       <div className=' relative flex gap-2'>
       <button className='border px-3 py-2 rounded-sm'>Drop Up</button>
       
       </div>
       </div>
    </div>
  )
}
