import React from 'react';
import styles from './TaskCreate.module.css';

const TaskCreate = ({setNewTask}) => {
    const generateId = () => {
        return Math.floor(Math.random() * 139932)
    }

    const formHandler = (event) => {
        event.preventDefault();
        const task = {};
        const inputs = event.target.querySelectorAll('input');

        inputs.forEach((input) => {
            task[input.id] = input.value;
        })

        task.createdDate = new Date();
        task.id = generateId();

        return setNewTask(task);
    }

    return (
        <section className={styles.taskCreate}>
            <form action="#" className={styles.form} onSubmit={formHandler}>
                <input type="text" placeholder="Введите название" id="title" required={true}/>
                <input type="text" placeholder="Введите описание" id="description" required={false}/>
                <input type="datetime-local" placeholder="Введите дату выполнения" id="submitedDate" required={true}/>
                <button type="submit" className={styles.button}>Создать задачу</button>
            </form>
        </section>
    );
};

export default TaskCreate;
