import React, { useState } from "react";

const Task3 = () => {
    const [mode,setMode]=useState(false)
   const modechanger=()=>{
    if(!mode){
        setMode(true)
    }
    else{
        setMode(false)
    }
   }
  return (
    <div className={`flex flex-col gap-10 ${mode?"bg-black text-white":"bg-white text-black"}`}>
      <p>Darkmode</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita eaque
        hic at? Quae architecto earum alias molestiae dolorem ducimus, eum ea
        animi ut velit, repudiandae aliquid tenetur labore. Error, quae.
      </p>
      <button onClick={modechanger} className=" w-32 border-2 border-black rounded-md  focus:border-blue-500"> Change Mode</button>
    </div>
  );
};

export default Task3;
