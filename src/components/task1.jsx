import React, { useState } from 'react'

const Task1 = () => {
  const [count,setCount]=useState(0)
  return (
    <div className='flex gap-5 '>
        <button className='border-2 border-green-400'onClick={()=>setCount(count+1)}>Increment</button>
        <p>{count}</p>
        <button className='border-2 border-red-400'onClick={()=>setCount(count-1)}>Decrement</button>
    </div>
  )
}

export default Task1