import './App.css';
import Header from "./components/Header/Header";
import TaskCreate from "./components/TaskCreate/TaskCreate";
import TaskList from "./components/TaskList/TaskList";
import {useEffect, useState} from "react";

function App() {
    const [tasks, setTasks] = useState(null);
    const initLocalStorage = () => {
        if (!localStorage.getItem('items') || !localStorage.getItem('itemsSoon')) {
            localStorage.setItem('items', JSON.stringify({}))
            localStorage.setItem('itemsSoon', JSON.stringify({}))
        }
    }

    const getStorageData = (key) => {
        return JSON.parse(localStorage.getItem(key));
    }

    const setNewTask = (task, id) => {
        const prevValue = getStorageData('items');
        localStorage.setItem('items', JSON.stringify({...prevValue, [id]: task}))
        setTasks(getStorageData('items'));
    }

    const changeTaskValue = (id, key, value) => {
        const prevValue = getStorageData('items');
        const prevValueCurrent = prevValue[id];
        localStorage.setItem('items', JSON.stringify({...prevValue, [id]: {...prevValueCurrent, [key]: value}}))
        setTasks(getStorageData('items'));
    }

    const deleteTask = (task) => {
        const newValue = getStorageData('items').filter((item) => item.id !== task.id);
        localStorage.setItem('items', JSON.stringify(newValue))
        setTasks(getStorageData('items'));
    }

    const getTasks = () => {
        return JSON.parse(localStorage.getItem('items')) || {};
    }

    useEffect(() => {
        initLocalStorage();
        const tasks = getTasks();
        setTasks(tasks);
    }, []);

  return (
      <div className="App">
          <Header/>
          <TaskCreate setNewTask={setNewTask} getStorageData={getStorageData}/>
          <TaskList tasks={tasks} deleteTask={deleteTask}/>
      </div>
  );
}

export default App;
