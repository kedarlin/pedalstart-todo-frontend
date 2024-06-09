import React, { useState } from 'react';
import './NewTask.css';
import { FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addTask } from '../../Redux/TaskSlice.js';

const NewTask = () => {
    const [showPopup, setShowPopup] = useState(false);
    const dispatch = useDispatch();

    const handleOpenPopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const taskDate = event.target.taskDate.value;
        const deadlineTime = event.target.deadlineTime.value;
        const deadlineDateTime = new Date(`${taskDate}T${deadlineTime}`);
        const currentDateTime = new Date();

        if (deadlineDateTime < currentDateTime) {
            alert("Deadline cannot be in the past!");
            return;
        }

        const taskData = {
            userId: localStorage.getItem('userId'),
            taskName: event.target.taskName.value,
            taskDescription: event.target.taskDescription.value,
            taskDate: taskDate,
            taskType: event.target.taskType.value,
            deadlineTime: deadlineDateTime,
        };

        try {
            await dispatch(addTask(taskData)).unwrap();
            handleClosePopup();
        } catch (error) {
            console.error('Failed to add the task:', error);
        }
    };

    return (
        <div>
            <div className={`overlay ${showPopup ? 'blur' : ''}`}>
                <div className='new-task' onClick={handleOpenPopup}>
                    <FaPlus />
                </div>
            </div>
            {showPopup && (
                <div className='popup'>
                    <div className='popup-inner'>
                        <h2 className='new-task-title'>Add New Task</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Task Name:
                                <input type='text' name='taskName' required />
                            </label>
                            <label>
                                Task Description:
                                <textarea name='taskDescription' required></textarea>
                            </label>
                            <label>
                                Task Date:
                                <input type='date' name='taskDate' required />
                            </label>
                            <label>
                                Task Type:
                                <select name='taskType' className='new-task-type' required>
                                    <option value=''>Select Task Type</option>
                                    <option value='personal'>Personal</option>
                                    <option value='work'>Work</option>
                                    <option value='education'>Education</option>
                                </select>
                            </label>
                            <label>
                                Deadline Time:
                                <input type='time' name='deadlineTime' required />
                            </label>
                            <div className='form-actions'>
                                <button className='new-task-add-button' type='submit'>Add Task</button>
                                <button className='new-task-cancel-button' type='button' onClick={handleClosePopup}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
export default NewTask;