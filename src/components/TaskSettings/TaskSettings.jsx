import React, {useState} from 'react';
import styles from './TaskSettings.module.css';

const TaskSettings = ({setTasks, tasks}) => {
    const [sorted, setSorted] = useState(false);
    const [sortedType, setSortedType] = useState('');
    const sortByDateAscending = (array, key) => {
        return array.slice().sort(function(a, b) {
            return new Date(a[key]) - new Date(b[key]);
        });
    }

    const sortByDateDescending = (array, key) => {
        return array.slice().sort(function(a, b) {
            return new Date(b[key]) - new Date(a[key]);
        });
    }

    const newTasks = (key) => {
        if (!sorted) {
            const items = sortByDateDescending(tasks, key)
            setTasks(items);
            setSortedType('убыванию')
        } else {
            const items = sortByDateAscending(tasks, key)
            setTasks(items);
            setSortedType('возрастанию')
        }

        setSorted(!sorted);
    }


    return (
        <div className={styles.settings}>
            <p>Сейчас отсортировано по: {sortedType}</p>
            <div className={styles.buttons}>
                <button className={styles.button} onClick={() => newTasks('createdDate')}>Отсортировать по дате создания</button>
                <button className={styles.button} onClick={() => newTasks('submitedDate')}>Отсортировать по сроку выполнения</button>
            </div>
        </div>
    );
};

export default TaskSettings;
