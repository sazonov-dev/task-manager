import React, {useEffect, useState} from 'react';
import styles from './TaskListItem.module.css';

const TaskListItem = ({task, deleteTask, editTask}) => {
    const [title, setTitle] = useState(false);
    const [description, setDescription] = useState(false);
    const [date, setDate] = useState(false);

    const changeState = (action, state) => {
        switch (action) {
            case "title":
                return setTitle(state);
            case "description":
                return setDescription(state);
            case "submitedDate":
                return setDate(state);
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

    const createdDate = new Date(task.createdDate);
    const submittedDate = new Date(task.submitedDate);

    return (
        <article className={styles.item}>
            <input type="checkbox" onClick={checkBoxHandler} checked={task.submitted}/>
            <div className={styles.content} id="content">
                {title === false ? <p className={styles.textEdit} onClick={() => changeState('title', true)}>{task.title}</p> : <div className={styles.input}><input className={styles.inputItem} type="text" placeholder="Введите новое название" id="title" /> <button className={styles.inputButton} onClick={(event) => inputHandler(event, 'title')}></button> <button className={`${styles.inputButton} ${styles.cross}`} onClick={() => changeState('title', false)}></button></div>}
                {description === false ? <p className={styles.textEdit} onClick={() => changeState('description', true)}>{task.description}</p> : <div className={styles.input}><input className={styles.inputItem} type="text" placeholder="Введите новое описание" id="description" /> <button className={styles.inputButton} onClick={(event) => inputHandler(event, 'description')}></button> <button className={`${styles.inputButton} ${styles.cross}`} onClick={() => changeState('description', false)}></button></div>}
                {date === false ? <p className={styles.textEdit} onClick={() => changeState('submitedDate', true)}>Дата завершения таска: {submittedDate.getFullYear()}-{(submittedDate.getMonth() + 1).toString().padStart(2, '0')}-{submittedDate.getDate().toString().padStart(2, '0')} {submittedDate.getHours().toString().padStart(2, '0')}:{submittedDate.getMinutes().toString().padStart(2, '0')}</p> : <div className={styles.input}><input className={styles.inputItem} type="datetime-local" placeholder="Введите новое дату" id="submitedDate" /> <button className={styles.inputButton} onClick={(event) => inputHandler(event, 'submitedDate')}></button> <button className={`${styles.inputButton} ${styles.cross}`} onClick={() => changeState('submitedDate', false)}></button></div>}
                <p>Дата создания таска: {createdDate.getFullYear()}-{(createdDate.getMonth() + 1).toString().padStart(2, '0')}-{createdDate.getDate().toString().padStart(2, '0')} {createdDate.getHours().toString().padStart(2, '0')}:{createdDate.getMinutes().toString().padStart(2, '0')}</p>
            </div>
            <button className={styles.button} onClick={() => deleteTask(task)}></button>
        </article>
    );
};

export default TaskListItem;
