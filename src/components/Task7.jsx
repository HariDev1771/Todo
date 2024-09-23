import React, { useState } from "react";

const Task7 = () => {
  const [item, setItem] = useState([]);
  const [inputvalue, setInputvalue] = useState("");
  const [isdisabled, setIsdisabled] = useState([]);

  const taskadd = () => {
    if (inputvalue.trim() === "") return;
    setItem([...item, inputvalue]);
    setIsdisabled([...isdisabled, true]);
    setInputvalue("");
  };
  const handleonchange = (e) => {
    setInputvalue(e.target.value);
  };
  const deletetasks = (key) => {
    const newitems = item.filter((item, index) => index != key);
    const newdisable = isdisabled.filter((item, index) => index != key);
    setItem(newitems);
    setIsdisabled(newdisable);
  };
  const edittask = (key) => {
    const newdisable = [...isdisabled];
    newdisable[key] = !newdisable[key];
    setIsdisabled(newdisable);
  };
  const changeedit = (e, key) => {
    const newitem = [...item];
    newitem[key] = e.target.value;
    setItem(newitem);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <h1 className="text-3xl font-bold text-yellow-600">
        Todo List {"\u{1F4DD}"}
      </h1>
      <div className="flex gap-5">
        <input
          onChange={handleonchange}
          className="border-2 border-gray-400 h-12 w-80 rounded-3xl p-4 "
          placeholder="Add your tasks"
          value={inputvalue}
        />
        <button onClick={taskadd} className="w-24 bg-slate-300 rounded-3xl">
          Add
        </button>
      </div>
      <div>
        <ul
          className={`${
            item.length
              ? "flex flex-col border-2 border-yellow-700 rounded-2xl min-h-[40rem] w-[50rem] gap-5  pt-2 pl-5 pr-9 pb-5"
              : "hidden"
          }`}
        >
          {item.map((i, index) => (
            <li className="flex justify-between p-5 pb-0 pl-12 pr-14 ">
              <p className=" ">
                <span className="font-bold">{index + 1}</span> .{" "}
                <input
                  onChange={(e) => changeedit(e, index)}
                  className="pl-2 text-xl font-semibold outline-none bg-transparent w-[29rem] border-b-2  border-dashed"
                  value={i}
                  disabled={isdisabled[index]}
                />
              </p>
              <div className="flex gap-8 ">
                {isdisabled[index] ? (
                  <button onClick={() => edittask(index)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#000000"
                    >
                      <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                    </svg>
                  </button>
                ) : (
                  <button onClick={() => edittask(index)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#5f6368"
                    >
                      <path d="M268-240 42-466l57-56 170 170 56 56-57 56Zm226 0L268-466l56-57 170 170 368-368 56 57-424 424Zm0-226-57-56 198-198 57 56-198 198Z" />
                    </svg>
                  </button>
                )}
                <button onClick={() => deletetasks(index)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000000"
                  >
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Task7;
