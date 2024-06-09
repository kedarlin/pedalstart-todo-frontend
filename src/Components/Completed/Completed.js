import React from 'react';
import './Completed.css';
import { useSelector, useDispatch } from 'react-redux';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { updateTask, deleteTask } from '../../Redux/TaskSlice.js';

const Completed = () => {
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

    const formatDeadline = (deadlineTime) => {
        const deadlineDate = new Date(deadlineTime);
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (deadlineDate.toDateString() === today.toDateString()) {
            return "Today";
        } else if (deadlineDate.toDateString() === tomorrow.toDateString()) {
            return "Tomorrow";
        } else {
            return deadlineDate.toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            });
        }
    };

    if (tasksStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (tasksStatus === 'failed') {
        return <div>Error: {error}</div>;
    }

    const completedTasks = tasks
        .filter(task => task.taskStatus)
        .sort((a, b) => new Date(a.taskDate) - new Date(b.taskDate));

    return (
        <div className='completed'>
            <div className='completed-head'>
                Completed Tasks <span className='completed-tasks-count'>&emsp;{completedTasks.length}</span>
            </div>
            {completedTasks.length === 0 ? (
                <div className='completed-tasks-not-found'>No Tasks Found</div>
            ) : (
                <div className='completed-tasks'>
                    {completedTasks.map(task => (
                        <div key={task._id} className='completed-task'>
                            <div className='completed-task-content'>
                                <input
                                    type='checkbox'
                                    className='completed-task-check'
                                    onChange={() => handleTaskCheck(task._id, !task.taskStatus)}
                                    checked={task.taskStatus}
                                />
                                <div className='completed-task-name'>{task.taskName}</div>
                                <span>by {formatDeadline(task.deadlineTime)}</span>
                            </div>
                            <div className='completed-task-options'>
                                <FaEdit className='completed-task-option' />
                                <FaTrash className='completed-task-option' onClick={() => handleTaskDelete(task._id)} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Completed;