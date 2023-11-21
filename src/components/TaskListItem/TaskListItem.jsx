import React, {useState} from 'react';
import styles from './TaskListItem.module.css';

const TaskListItem = ({task, deleteTask}) => {
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

    return (
        <article className={styles.item}>
            <input type="checkbox"/>
            <div className={styles.content}>
                {title === false ? <p className={styles.textEdit} onClick={() => changeState('title', true)}>{task.title}</p> : <div className={styles.input}><input className={styles.inputItem} type="text" placeholder="Введите новое название"/> <button className={styles.inputButton}></button> <button className={`${styles.inputButton} ${styles.cross}`} onClick={() => changeState('title', false)}></button></div>}
                {description === false ? <p className={styles.textEdit} onClick={() => changeState('description', true)}>{task.description}</p> : <div className={styles.input}><input className={styles.inputItem} type="text" placeholder="Введите новое описание"/> <button className={styles.inputButton}></button> <button className={`${styles.inputButton} ${styles.cross}`} onClick={() => changeState('description', false)}></button></div>}
                <p>Дата выполнения до: {task.submitedDate}</p>
                <p>Дата создания таска: {task.createdDate}</p>
            </div>
            <button className={styles.button} onClick={() => deleteTask(task)}></button>
        </article>
    );
};

export default TaskListItem;
