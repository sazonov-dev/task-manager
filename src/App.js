import './App.css';
import Header from "./components/Header/Header";
import TaskCreate from "./components/TaskCreate/TaskCreate";
import TaskList from "./components/TaskList/TaskList";
import {useEffect, useState} from "react";

function App() {
    const [tasks, setTasks] = useState(null);

    const initLocalStorage = () => {
        if (!localStorage.getItem('items') || !localStorage.getItem('send')) {
            localStorage.setItem('items', JSON.stringify([]))
            localStorage.setItem('send', JSON.stringify([]))
        }
    }

    const getStorageData = (key) => {
        return JSON.parse(localStorage.getItem(key));
    }

    const setNewTask = (task) => {
        const prevValue = getStorageData('items');
        localStorage.setItem('items', JSON.stringify([...prevValue, task]))
        setTasks(getStorageData('items'));
    }

    const editTask = (key, task, value) => {
        const tasks = getStorageData('items');
        const newTask = tasks.map((item) => {
            if (item.id === task.id) {
                return {
                    ...task, [key]: value
                }
            }
            return item;
        })
        localStorage.setItem('items', JSON.stringify(newTask))
        setTasks(getStorageData('items'));
    }

    const deleteTask = (task) => {
        const newValue = getStorageData('items').filter((item) => item.id !== task.id);
        localStorage.setItem('items', JSON.stringify(newValue))
        setTasks(getStorageData('items'));
    }

    const getTasks = () => {
        return JSON.parse(localStorage.getItem('items')) || [];
    }

    const sendMessage = (message, email) => {
        fetch('http://localhost:3050/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({html: message, email: email, subject: 'Ваша запланированная задача не завершена!'})
        }).then((response) => response.json()).catch((error) => console.log(error))
    }

    const checkDate = (submittedDate) => {
        const oldTime = new Date(submittedDate);
        const currentTime = new Date();
        const hoursLimit = 12 * 60 * 60 * 1000; // 12 часов и отправка уведомления

        const dateDifference = oldTime - currentTime;

        return dateDifference <= hoursLimit;
    }

    const taskFilter = () => {
        const tasks = getStorageData('items');
        const itemsToEmail = tasks.map((task) => {
            if (!task.submitted && checkDate(task.submitedDate)) {
                return task;
            }
        }).filter((item) => item !== undefined);

        if (itemsToEmail.length > 0) {
            return filteredTasksHandler(itemsToEmail);
        }

        return null;
    }

    const isSend = (task) => {
        const sendTask = getStorageData('send') || [];

        if (sendTask.length === 0) {
            return false
        }

        return sendTask.some((item) => item.id === task.id);
    }

    const filteredTasksHandler = (tasks) => {
        tasks.forEach((task) => {
            if (!isSend(task)) {
                const message = `<b>Осталось менее 12 часов для выполнения задачи - ${task.title}</b><br/><b>Необходимо выполнить до: ${task.submitedDate.split('T').join(' ')}</b>`
                sendMessage(message, 'sazonovnnn@yandex.ru');
                const sendTasks = getStorageData('send') || [];
                const newSend = [...sendTasks, task];
                localStorage.setItem('send', JSON.stringify(newSend));
            }
            return null;
        })
    }

    useEffect(() => {
        initLocalStorage();
        const tasks = getTasks();
        setTasks(tasks);
        setInterval(() => {
            taskFilter();
        }, 3600000) // 1 час
    }, []);

  return (
      <div className="App">
          <Header/>
          <TaskCreate setNewTask={setNewTask} getStorageData={getStorageData}/>
          <TaskList tasks={tasks} deleteTask={deleteTask} editTask={editTask} setTasks={setTasks}/>
      </div>
  );
}

export default App;
