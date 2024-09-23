import React, { useState } from "react";

const Task6 = () => {
  const [fruit, setFruit] = useState([
    { fruitname: "Orange", like: 0 },
    { fruitname: "Apple", like: 0 },
    { fruitname: "Banana", like: 0 },
    { fruitname: "Pomegranate", like: 0 },
    { fruitname: "Mango", like: 0 },
    { fruitname: "Pineapple", like: 0 },
    { fruitname: "Muzambi", like: 0 },
    { fruitname: "Chikku", like: 0 },
    { fruitname: "Blueberry", like: 0 },
    { fruitname: "Grape", like: 0 },
  ]);
  const likefunc = (key) => {
    setFruit(
      fruit.map((fruit, index) =>
        index == key ? { ...fruit, like: fruit.like + 1 } : fruit
      )
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap  gap-28 pl-8 ">
        {fruit.map((f, index) => (
          <div
            key={index}
            className="border-2 border-green-400 w-[35rem] h-44 flex flex-col items-center justify-center"
          >
            <p>{f.fruitname}</p>
            <button onClick={() => likefunc(index)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368"
              >
                <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" />
              </svg>
            </button>
            <p>{f.like}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task6;
