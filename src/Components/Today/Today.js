import React from 'react';
import './Today.css';
import { useSelector, useDispatch } from 'react-redux';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { updateTask, deleteTask } from '../../Redux/TaskSlice.js';

const Today = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.items);
    const tasksStatus = useSelector((state) => state.tasks.status);
    const error = useSelector((state) => state.tasks.error);

    const handleTaskCheck = (taskId, taskStatus) => {
        dispatch(updateTask({ id: taskId, taskStatus }));
    };

    const handleTaskDelete = (taskId) => {
        // Dispatch action to delete the task
        dispatch(deleteTask(taskId));
    };

    if (tasksStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (tasksStatus === 'failed') {
        return <div>Error: {error}</div>;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysTasks = tasks.filter(task => {
        const taskDate = new Date(task.taskDate);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate.getTime() === today.getTime();
    });

    const formattedDate = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const todayTasks = todaysTasks.filter(task => !task.taskStatus)
    .sort((a, b) => new Date(a.taskDate) - new Date(b.taskDate));
    return (
        <div className='today'>
            <div className='today-head'>
                Today
            </div>
            <div className='today-date'>
                {formattedDate}
                <span className='today-tasks-count'>&emsp;{todayTasks.length}</span>
            </div>
            {todayTasks.length === 0 ? (
                <div className='tasks-not-found'>No Tasks Found</div>
            ) : (
                <div className='tasks'>
                    {todayTasks.map(task => (
                        <div key={task._id} className='task'>
                            <div className='task-content'>
                                <input 
                                    type='checkbox' 
                                    className='task-check' 
                                    onChange={() => handleTaskCheck(task._id, !task.taskStatus)} // Handle task completion
                                    checked={task.completed} // Reflect task completion status
                                />
                                <div className='task-name'>{task.taskName}</div>
                                <span>by {new Date(task.deadlineTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
                            </div>
                            <div className='task-options'>
                                <FaEdit className='task-option'/>
                                <FaTrash className='task-option' onClick={() => handleTaskDelete(task._id)} /> {/* Handle task deletion */}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Today;