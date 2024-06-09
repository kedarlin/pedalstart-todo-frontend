import React from 'react';
import './Sidebar.css';
import { FaCalendar, FaCheckCircle, FaSignOutAlt, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { selectItem, selectSidebarOpen } from '../../Redux/SidebarSlice';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedItem = useSelector((state) => state.sidebar.selectedItem);
  const isSidebarOpen = useSelector(selectSidebarOpen);

  const handleClick = (item) => {
    dispatch(selectItem(item));
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className='sidebar-item sidebar-logout'>
        <p className='sidebar-name'>Hello {localStorage.getItem('userName')}</p>
      </div>
      <div className={`sidebar-item ${selectedItem === 'Today' ? 'active' : ''}`} onClick={() => handleClick('Today')}>
        <FaCalendar />
        <p className='sidebar-name'>Today</p>
      </div>
      <div className={`sidebar-item ${selectedItem === 'Tomorrow' ? 'active' : ''}`} onClick={() => handleClick('Tomorrow')}>
        <FaCalendar />
        <p className='sidebar-name'>Tomorrow</p>
      </div>
      <div className={`sidebar-item ${selectedItem === 'All' ? 'active' : ''}`} onClick={() => handleClick('All')}>
        <FaCalendar />
        <p className='sidebar-name'>All</p>
      </div>
      <div className='divider' />
      <div className={`sidebar-item ${selectedItem === 'Personal' ? 'active' : ''}`} onClick={() => handleClick('Personal')}>
        Personal
      </div>
      <div className={`sidebar-item ${selectedItem === 'Work' ? 'active' : ''}`} onClick={() => handleClick('Work')}>
        Work
      </div>
      <div className={`sidebar-item ${selectedItem === 'Education' ? 'active' : ''}`} onClick={() => handleClick('Education')}>
        Education
      </div>
      <div className='divider' />
      <div className={`sidebar-item ${selectedItem === 'Completed' ? 'active' : ''}`} onClick={() => handleClick('Completed')}>
        <FaCheckCircle />
        <p className='sidebar-name'>Completed</p>
      </div>
      <div className={`sidebar-item ${selectedItem === 'Trash' ? 'active' : ''}`} onClick={() => handleClick('Trash')}>
        <FaTrash />
        <p className='sidebar-name'>Trash</p>
      </div>
      <div className='divider' />
      <div className='sidebar-item sidebar-logout' onClick={handleLogout}>
        <FaSignOutAlt />
        <p className='sidebar-name'>Logout</p>
      </div>
    </div>
  );
};

export default Sidebar;