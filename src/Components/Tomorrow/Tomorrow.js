import React from 'react';
import './Tomorrow.css';
import { useSelector, useDispatch } from 'react-redux';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { updateTask, deleteTask } from '../../Redux/TaskSlice.js';

const Tomorrow = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.items);
    const tasksStatus = useSelector((state) => state.tasks.status);
    const error = useSelector((state) => state.tasks.error);

    const handleTaskCheck = (taskId, taskStatus) => {
        dispatch(updateTask({ id: taskId, taskStatus }));
    };

    const handleTaskDelete = (taskId) => {
        dispatch(deleteTask(taskId));
    };

    if (tasksStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (tasksStatus === 'failed') {
        return <div>Error: {error}</div>;
    }

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const tomorrowsTasks = tasks.filter(task => {
        const taskDate = new Date(task.taskDate);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate.getTime() === tomorrow.getTime();
    });

    const formattedDate = tomorrow.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const tomorrowTasks = tomorrowsTasks.filter(task => !task.taskStatus)
    .sort((a, b) => new Date(a.taskDate) - new Date(b.taskDate));
    return (
        <div className='tomorrow'>
            <div className='tomorrow-head'>
                Tomorrow
            </div>
            <div className='tomorrow-date'>
                {formattedDate}
                <span className='tomorrow-tasks-count'>&emsp;{tomorrowTasks.length}</span>
            </div>
            {tomorrowTasks.length === 0 ? (
                <div className='tomorrow-tasks-not-found'>No Tasks Found</div>
            ) : (
                <div className='tomorrow-tasks'>
                    {tomorrowTasks.map(task => (
                        <div key={task._id} className='tomorrow-task'>
                            <div className='tomorrow-task-content'>
                                <input
                                    type='checkbox'
                                    className='tomorrow-task-check'
                                    onChange={() => handleTaskCheck(task._id, !task.taskStatus)}
                                    checked={task.completed}
                                />
                                <div className='tomorrow-task-name'>{task.taskName}</div>
                                <span>by {new Date(task.deadlineTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
                            </div>
                            <div className='tomorrow-task-options'>
                                <FaEdit className='tomorrow-task-option' />
                                <FaTrash className='tomorrow-task-option' onClick={() => handleTaskDelete(task._id)} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Tomorrow;