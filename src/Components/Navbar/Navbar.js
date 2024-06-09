import React from 'react'
import './Navbar.css'
import { FaBars, FaBell, FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar, selectSidebarOpen } from '../../Redux/SidebarSlice'

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSidebarOpen = useSelector(selectSidebarOpen);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleToggleSidebar = () => {
        dispatch(toggleSidebar());
    };
    return (
        <div className='navbar'>
            <div className='navbar-menu' onClick={handleToggleSidebar}>
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </div>
            <div className='user-name navbar-reduced'>
                Hello {localStorage.getItem('userName')}!
            </div>
            {/* <div className='search-bar'>
                <FaSearch />
                <input type='text' className='search-bar-input' placeholder='Search' />
            </div> */}
            <div className='navbar-name'>
                To Do Manager
            </div>
            <div className='nav-items'>
                <FaBell />
                <div className='navbar-logout' onClick={handleLogout}>
                    Logout
                </div>
            </div>
        </div>
    )
}

export default Navbar