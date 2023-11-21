import React from 'react';
import styles from './TaskSettings.module.css';

const TaskSettings = () => {
    return (
        <div className={styles.settings}>
            <button className={styles.button}>Отсортировать по дате создания</button>
            <button className={styles.button}>Отсортировать по сроку выполнения</button>
        </div>
    );
};

export default TaskSettings;
