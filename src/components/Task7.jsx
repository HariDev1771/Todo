import React, { useEffect, useState } from "react";
import PocketBase from "pocketbase";
const pb = new PocketBase("http://127.0.0.1:8090");

const Task7 = () => {
  const [item, setItem] = useState([]);
  const [inputvalue, setInputvalue] = useState("");
  const [isdisabled, setIsdisabled] = useState([]);
  const [isLogin, setIslogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    
     setLoading(true)
   
    const storedUserId = localStorage.getItem("userId");
    // const currentuser = pb.authStore.model;
    // setUser(currentuser);
    if (storedUserId) {
     fetchuserTasks(storedUserId).
     then(()=>{setUser({ id: storedUserId });
     setIslogin(true);})
     .finally(()=>{
      setLoading(false)
     })
      
      
      // setLoading(false)
    }
   else{
    setLoading(false)
   }
   
   
  }, []);

  const taskadd = async () => {
    if (inputvalue.trim() === "") return;

    const taskData = {
      user: user.id, // Assign the logged-in user's ID
      Tasktitle: inputvalue,
    };
    const createdTask = await pb.collection("Tasks").create(taskData);
    setItem((prev) => [...prev, createdTask.task]);
    setIsdisabled((prev) => [...prev, true]);
    setInputvalue("");
  };
  const handleonchange = (e) => {
    setInputvalue(e.target.value);
  };
  const deletetasks = async (key) => {
    const taskToDelete = item[key];
    await pb.collection("tasks").delete(taskToDelete.id); // Delete from PocketBase
    const newitems = item.filter((_, index) => index !== key);
    const newdisable = isdisabled.filter((_, index) => index !== key);
    setItem(newitems);
    setIsdisabled(newdisable);
  };
  const edittask = (key) => {
    const newdisable = [...isdisabled];
    newdisable[key] = !newdisable[key];
    setIsdisabled(newdisable);
  };
  const changeedit = async (e, key) => {
    const updatedTask = { Tasktitle: e.target.value }; // Ensure the field name matches your schema
    const taskId = item[key].id;

    try {
      await pb.collection("Tasks").update(taskId, updatedTask);
      const updatedItems = [...item];
      updatedItems[key] = { ...updatedItems[key], Tasktitle: e.target.value };
      setItem(updatedItems);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  const fetchuserTasks = async (userId) => {
    // if (!user) return; // Ensure user is logged in
    try {
      const tasks = await pb
        .collection("Tasks")
        .getFullList(200, { filter: `user = "${userId}"` });
      setItem(tasks); // Ensure setItem is defined correctly
      setIsdisabled(new Array(tasks.length).fill(true));
      console.log(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error); // Log the error for debugging
    }
  };
  const handlesignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const record = await pb
        .collection("users")
        .create({
          email: email,
          password: password,
          passwordConfirm: confirmPassword,
        });
      console.log("Signup Successful !!");
      setError("");
    } catch (error) {
      console.error("Signup Failed");
      setError("Signup Failed: " + error.message);
    }
  };
  const handlelogin = async () => {
    try {
      console.log("Email:", email, "Password:", password);
      const userData = await pb
        .collection("users")
        .authWithPassword(email, password);
      setUser(userData.record);
      setIslogin(true);
      fetchuserTasks(userData.record.id);
      localStorage.setItem("userId", userData.record.id);
      console.log("Login Successful !!");
      setError("");
    } catch (error) {
      console.log("Login failed");
      setError("Login Failed: " + error.message);
    }
  };
  const handleLogout = async () => {
    await pb.authStore.clear(); // Clear auth store and log out user
    setUser(null);
    setIslogin(false); // Set login state to false
    setItem([]);
    localStorage.removeItem("userId"); // Clear tasks
  };

  return (
    <>{loading?(<div className="text-green">Loading screen</div>):(
    <div className="flex flex-col justify-center items-center gap-8">
      <h1 className="text-3xl font-bold text-yellow-600">
        Todo List {"\u{1F4DD}"}
      </h1>

      {isLogin ? (
        <>
          {" "}
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
            <button
              onClick={handleLogout}
              className="w-24 bg-red-300 rounded-3xl"
            >
              Logout
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
                <li
                  key={i.id}
                  className="flex justify-between p-5 pb-0 pl-12 pr-14 "
                >
                  <p className=" ">
                    <span className="font-bold">{index + 1}</span> .{" "}
                    <input
                      onChange={(e) => changeedit(e, index)}
                      className="pl-2 text-xl font-semibold outline-none bg-transparent w-[29rem] border-b-2  border-dashed"
                      value={i.Tasktitle}
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
        </>
      ) : (
        <div className="flex flex-col items-center gap-3 border-2 border-gray-500 p-10 rounded-3xl">
          <h2 className="text-2xl">Sign Up / Login</h2>
          <input
            placeholder="Email"
            // value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-400 h-12 w-80 rounded-3xl p-4 mb-2"
          />
          <input
            type="password"
            placeholder="Password"
            // value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-400 h-12 w-80 rounded-3xl p-4 mb-2"
          />
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            // value={confirmPassword}
            type="password"
            placeholder="Confirm Password"
            className="border-2 border-gray-400 h-12 w-80 rounded-3xl p-4 "
          />
          <div className="flex justify-center gap-3">
            <button
              onClick={handlesignup}
              className="w-24 bg-blue-300 rounded-3xl "
            >
              Sign Up
            </button>
            <button
              onClick={handlelogin}
              className="w-24 bg-green-300 rounded-3xl"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>)}</>
  );
};

export default Task7;
