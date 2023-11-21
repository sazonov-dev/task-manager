import React, {useState} from 'react';
import styles from './TaskListItem.module.css';

const TaskListItem = ({task, deleteTask, editTask}) => {
    const [title, setTitle] = useState(false);
    const [description, setDescription] = useState(false);

    const changeState = (action, state) => {
        switch (action) {
            case "title":
                return setTitle(state);
            case "description":
                return setDescription(state);
        }
    }

    const inputHandler = (event, action) => {
        const container = event.target.closest('#content');
        const input = container.querySelector(`#${action}`);
        changeState(action, false);
        return editTask(action, task, input.value);
    }

    const checkBoxHandler = (event) => {
        if (event.target.checked) {
            return editTask('submitted', task, true);
        } else {
            return editTask('submitted', task, false);
        }
    }

    return (
        <article className={styles.item}>
            <input type="checkbox" onClick={checkBoxHandler} checked={task.submitted}/>
            <div className={styles.content} id="content">
                {title === false ? <p className={styles.textEdit} onClick={() => changeState('title', true)}>{task.title}</p> : <div className={styles.input}><input className={styles.inputItem} type="text" placeholder="Введите новое название" id="title" /> <button className={styles.inputButton} onClick={(event) => inputHandler(event, 'title')}></button> <button className={`${styles.inputButton} ${styles.cross}`} onClick={() => changeState('title', false)}></button></div>}
                {description === false ? <p className={styles.textEdit} onClick={() => changeState('description', true)}>{task.description}</p> : <div className={styles.input}><input className={styles.inputItem} type="text" placeholder="Введите новое описание" id="description" /> <button className={styles.inputButton} onClick={(event) => inputHandler(event, 'description')}></button> <button className={`${styles.inputButton} ${styles.cross}`} onClick={() => changeState('description', false)}></button></div>}
                <p>Дата выполнения до: {task.submitedDate}</p>
                <p>Дата создания таска: {task.createdDate}</p>
            </div>
            <button className={styles.button} onClick={() => deleteTask(task)}></button>
        </article>
    );
};

export default TaskListItem;
