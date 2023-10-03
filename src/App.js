import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import { createContext, useState } from 'react';

export const TaskContext = createContext()

function App() {
  const[tasks,setTasks] = useState([])
  const[token,setToken] = useState("")
  const UpdateTasks = (data)=>{
    setTasks(data)
  }
  const UpdateToken = (data)=>{
    setToken(data)
  }
  
  return (
    <div className="App">
      <TaskContext.Provider value={{tasks,UpdateTasks,token,UpdateToken}}>
      <Navbar/>
      </TaskContext.Provider>
    </div>
  );
}

export default App;
