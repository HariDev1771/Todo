import React, { useState } from "react";

const Task5 = () => {
  const [item, setItem] = useState([]);
  const promptclicker = () => {
    let val = window.prompt("Give your Entry");
    setItem([...item, val]);
  };
  return (
    <div className="flex flex-col  gap-5 justify-center items-center p-5">
      <h1 className="text-2xl font-bold text-yellow-700">Mini To-Do</h1>
      <button
        onClick={promptclicker}
        className="border-2 border-gray-600 rounded-md p-2 bg-gradient-to-r from-gray-700 via-gray-500 to-gray-800  hover:shadow-2xl transform hover:-translate-y-1"
      >
        Add Elements to the array
      </button>
      <ul
        className={`${
          item.length
            ? "flex flex-col gap-8 border-2 border-yellow-700 w-[60rem] p-5 pl-12 rounded-xl"
            : "hidden"
        }`}
      >
        {item.map((items, index) => (
          <li className=" border-b-2 border-dashed">
            {index + 1} .<span className="font-semibold text-xl">{items}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Task5;
