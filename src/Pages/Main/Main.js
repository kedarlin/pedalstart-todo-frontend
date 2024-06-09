import React, { useEffect } from 'react';
import './Main.css';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Today from '../../Components/Today/Today';
import NewTask from '../../Components/NewTask/NewTask';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchTasks } from '../../Redux/TaskSlice.js';
import Tomorrow from '../../Components/Tomorrow/Tomorrow.js';
import All from '../../Components/All/All.js';
import Personal from '../../Components/Personal/Personal.js';
import Work from '../../Components/Work/Work.js';
import Education from '../../Components/Education/Education.js';
import Completed from '../../Components/Completed/Completed.js';

const Main = () => {
    const selectedItem = useSelector((state) => state.sidebar.selectedItem);
    const tasksStatus = useSelector((state) => state.tasks.status);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        } else {
            const userId = localStorage.getItem('userId');
            if (tasksStatus === 'idle') {
                dispatch(fetchTasks(userId));
            }
        }
    }, [navigate, dispatch, tasksStatus]);

    const renderComponent = () => {
        switch (selectedItem) {
            case 'Today':
                return <Today />;
            case 'Tomorrow':
                return <Tomorrow />;
            case 'All':
                return <All />;
            case 'Personal':
                return <Personal />;
            case 'Work':
                return <Work />;
            case 'Education':
                return <Education />;
            case 'Completed':
                return <Completed />;
            // case 'Trash':
            //     return <Trash />;
            default:
                return <Today />;
        }
    };

    return (
        <div className='main'>
            <Navbar />
            <div className='main-content'>
                <Sidebar />
                <div className='main-task'>
                    {renderComponent()}
                </div>
            </div>
            <NewTask />
        </div>
    );
};

export default Main;