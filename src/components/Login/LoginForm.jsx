import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const loginUser = async (credentials) => {
        try {
            // Send POST request to the back-end servlet
            const response = await axios.post('http://localhost:8080/MegaCity_war_exploded/login', credentials, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',  // You can change this if necessary
                }
            });
            return response.data;  // Return the response data which contains the token
        } catch (error) {
            throw error;  // If error, will be caught in the catch block below
        }
    };

    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await loginUser({ email, password });
    //         if (response.token) {
    //             localStorage.setItem('token', response.token);  // Store the token in localStorage
    //             navigate('/home');  // Navigate to the home page after successful login
    //         }
    //     } catch (error) {
    //         setErrorMessage('Invalid login credentials');  // Show error message if login fails
    //     }
    // };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser({ email, password });
            if (response && response.token) {
                localStorage.setItem('token', response.token);  // Store the token in localStorage
                
                // Decode the token to extract the role
                const decodedToken = jwtDecode(response.token);
                console.log("Decoded Token:", decodedToken);  // Log the decoded token to inspect it

                if (decodedToken.hasOwnProperty('userId')) {
                    const userId = decodedToken.userId;  // Extract userId
                    localStorage.setItem('userId', userId); // Store userId in localStorage
                    console.log("User ID:", userId);
                } else {
                    console.error("User ID not found in token");
                }
                // Ensure the token contains the 'role' key
                if (decodedToken.hasOwnProperty('role')) {
                    const role = decodedToken.role;  // Extract the role from the decoded token
                    console.log("User Role:", role);  // Log the role
    
                    
                    

                    // Redirect based on the role
                    if (role === 'customer') {
                        navigate('/cars');
                    } else if (role === 'admin') {
                        navigate('/admin-dashboard');
                    } else if (role === 'driver') {
                        navigate('/driver');
                    } else {
                        setErrorMessage('Invalid role');
                    }
                } else {
                    setErrorMessage('Role not found in token');
                    console.error('Role not found in token:', decodedToken);  // Log the decoded token if no role is found
                }
            } else {
                setErrorMessage('No token received');
            }
        } catch (error) {
            setErrorMessage('Invalid login credentials');  // Show error message if login fails
            console.error('Login error:', error);  // Log the error for debugging
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3>Login</h3>
                        </div>
                        <div className="card-body">
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                            <p className="mt-3">
                                <a href="/forgot-password">Forgot Password?</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
