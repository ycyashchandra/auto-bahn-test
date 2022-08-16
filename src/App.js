import "./App.css";
import Dashboard from "./components/Dashboard";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import AddNewTask from "./components/AddNewTask";
import axios from "axios";

function App() {
  const [selectedValue, setSelectedValue] = useState({
    title: "",
    userId: "",
    id: "",
    completed: false,
  });
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [data, setData] = useState();
  const dataArr = []
  console.log(completed);

  const submitData = () => {
    setSelectedValue({
      title: title,
      completed: completed,
      userId: 1,
      id: 1,
    });

    postCall(selectedValue);
  };

  useEffect(() => {
    // const getPosts = async () => {
    //   const response = await fetch("https://jsonplaceholder.typicode.com/todos/1")
    //     .then((response) => response.json())
    //     .then((response) => setData(response));
    // };


    // getPosts();
    // dataArr.push(data);
    axios.get('https://jsonplaceholder.typicode.com/todos/1').then(response => setData(response));
    dataArr.push(data)
  }, []);

  const postCall = (selectedValue) => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedValue),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const clearFields = () => {
    setTitle("");
    setCompleted(!completed);
  };

  console.log(selectedValue);
  return (
    <div className="App">
      <h1 className="app-header">AUTO BAHN TEST APP</h1>
      <div className="add-form">
        <h1>ADD TASK</h1>
        <input
          type="text"
          placeholder="Enter Task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>
          Completed
          <input
            type="checkbox"
            defaultChecked={completed}
            onChange={() => setCompleted(!completed)}
          />
        </label>
        <button onClick={submitData}>Add Task</button>
        <button onClick={clearFields}>Clear</button>
      </div>
      <div>
        <h1>DASHBOARD</h1>
        {dataArr.map((obj) => {
          return (
            <div>
              <h6>{obj.title}</h6>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
