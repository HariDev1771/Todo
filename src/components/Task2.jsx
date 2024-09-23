import React, { useState } from "react";

const Task2 = () => {
  const [like, setLike] = useState(30);
  const [check, setCheck] = useState(false);
  const clicking = () => {
    if (!check) {
      setLike(like + 1);
      setCheck((true));
    } else {
      setLike(like - 1);
      setCheck((false));
    }
  };

  return (
    <div className="flex flex-col border-2 border-black px-10">
      <p className="text-2xl ">All new Iphone 16 design</p>
      <img
        className="w-[60rem]  "
        src="https://www.apple.com/in/iphone-16/images/overview/product-viewer/iphone/all_colors__flhn5cmb1t26_xlarge.jpg"
      />
      <svg 
        onClick={ clicking}
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        
        viewBox="0 -960 960 960"
        width="24px"
        fill={check ? "red" : "grey"}
      >
        <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" />
      </svg>

      
      <p>{like}</p>
    </div>
  );
};

export default Task2;
