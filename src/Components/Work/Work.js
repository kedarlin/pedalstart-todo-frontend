import React from 'react';
import './Work.css';
import { useSelector, useDispatch } from 'react-redux';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { updateTask, deleteTask } from '../../Redux/TaskSlice.js';

const Work = () => {
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

    const workTasks = tasks.filter(task => task.taskType.toLowerCase() === 'work' && !task.taskStatus)
        .sort((a, b) => new Date(a.taskDate) - new Date(b.taskDate));

    return (
        <div className='work'>
            <div className='work-head'>
                Work Tasks
            </div>
            {workTasks.length === 0 ? (
                <div className='work-tasks-not-found'>No Tasks Found</div>
            ) : (
                <div className='work-tasks'>
                    {workTasks.map(task => (
                        <div key={task._id} className='work-task'>
                            <div className='work-task-content'>
                                <input
                                    type='checkbox'
                                    className='work-task-check'
                                    onChange={() => handleTaskCheck(task._id, !task.taskStatus)}
                                    checked={task.completed}
                                />
                                <div className='work-task-name'>{task.taskName}</div>
                                <span>by {formatDeadline(task.deadlineTime)}</span>
                            </div>
                            <div className='work-task-options'>
                                <FaEdit className='work-task-option' />
                                <FaTrash className='work-task-option' onClick={() => handleTaskDelete(task._id)} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Work;