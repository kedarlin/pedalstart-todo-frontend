import React, { useEffect, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        if(localStorage.getItem('token')){
            navigate('/todo');
        }
    }, [navigate]);
    // useEffect(() => {
    //     const checkAuthentication = async () => {
    //         const token = localStorage.getItem('token');
    //         if (token) {
    //             try {
    //                 const response = await axios.post('http://localhost:3005/api/auth/verify', null, {
    //                     headers: {
    //                         authorization: `Bearer ${token}`
    //                     }
    //                 });
    //                 if (response.status === 200) {
    //                     navigate('/todo');
    //                 }
    //             } catch (error) {
    //                 localStorage.removeItem('token');
    //                 console.error('Verification failed:', error);
    //             }
    //         }
    //     };

    //     checkAuthentication();
    // }, [navigate]);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    const handleSignup = () => {
        navigate('/signup');
    }

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3069/api/auth/signin', {
                email,
                password
            });
            const { token, userId, userName } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            localStorage.setItem('userName', userName);
            console.log(localStorage.getItem('token'), localStorage.getItem('userId'));
            navigate('/todo');
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('Invalid email or password. Please try again.');
        }
    }

    return (
        <div className='login-container'>
            <div className='login-body-container'>
                <div className='login-box'>
                    <div className='login-box-head'>LOGIN</div>

                    <div className='login-label'>Email</div>
                    <input type='text' placeholder='Enter Email...' className='login-input' value={email} onChange={(e) => setEmail(e.target.value)} />

                    <div className='login-label'>
                        Password
                        {/* <span className='login-forget-password'>Forget&nbsp;Password?</span> */}
                    </div>

                    <div className='password-container'>
                        <input type={isPasswordVisible ? 'text' : 'password'} placeholder='Enter Password...' className='login-input' value={password} onChange={(e) => setPassword(e.target.value)} />
                        {isPasswordVisible ? <FaEyeSlash className='eye-icon' onClick={togglePasswordVisibility} /> : <FaEye className='eye-icon' onClick={togglePasswordVisibility} />}
                    </div>

                    <button className='login-button' onClick={handleLogin}>Login</button>

                    {errorMessage && <div className='login-error-message'>{errorMessage}</div>}
                </div>
                <div className='login-signup-link'>
                    Don't have an account?&nbsp;<span className='login-signup' onClick={handleSignup}>Signup</span>
                </div>
            </div>
        </div>
    );
};

export default Login;