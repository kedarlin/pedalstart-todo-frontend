import React from 'react';
import './Education.css';
import { useSelector, useDispatch } from 'react-redux';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { updateTask, deleteTask } from '../../Redux/TaskSlice.js';

const Education = () => {
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

    const educationTasks = tasks
        .filter(task => task.taskType.toLowerCase() === 'education' && !task.completed)
        .sort((a, b) => new Date(a.taskDate) - new Date(b.taskDate));

    return (
        <div className='education'>
            <div className='education-head'>
                Education Tasks
            </div>
            {educationTasks.length === 0 ? (
                <div className='education-tasks-not-found'>No Tasks Found</div>
            ) : (
                <div className='education-tasks'>
                    {educationTasks.map(task => (
                        <div key={task._id} className='education-task'>
                            <div className='education-task-content'>
                                <input
                                    type='checkbox'
                                    className='education-task-check'
                                    onChange={() => handleTaskCheck(task._id, !task.taskStatus)}
                                    checked={task.completed}
                                />
                                <div className='education-task-name'>{task.taskName}</div>
                                <span>by {formatDeadline(task.deadlineTime)}</span>
                            </div>
                            <div className='education-task-options'>
                                <FaEdit className='education-task-option' />
                                <FaTrash className='education-task-option' onClick={() => handleTaskDelete(task._id)} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Education;