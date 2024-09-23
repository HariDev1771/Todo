import React, { useState } from 'react'

const Task4 = () => {
    const[val,setVal]=useState("hi");
    const getval=()=>{
        setVal(window.prompt("Enter the heading" ))
    }
  return (
    <div className='flex flex-col justify-center items-center'>
        <button onClick={getval} className='border-2 border-gray-600 rounded-md p-2 bg-gradient-to-r from-gray-700 via-gray-500 to-gray-800  hover:shadow-2xl transform hover:-translate-y-1'>Enter Your Prompt</button>
        <h1 className='text-2xl font-bold '>{val}</h1>
    </div>
  )
}

export default Task4