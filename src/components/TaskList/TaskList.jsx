import React from 'react';
import styles from './TaskList.module.css';
import TaskSettings from "../TaskSettings/TaskSettings";
import TaskListItem from "../TaskListItem/TaskListItem";

const TaskList = ({tasks, deleteTask, editTask}) => {
    return (
        <section className={styles.taskList}>
            <TaskSettings/>
            <div className={styles.itemContainer}>
                {
                    tasks !== null && tasks.length > 0 ? tasks.map((task) => <TaskListItem key={task.id} task={task} deleteTask={deleteTask} editTask={editTask}/>) : <h2 className={styles.error}>Тасков нету</h2>
                }
            </div>
        </section>
    );
};

export default TaskList;
