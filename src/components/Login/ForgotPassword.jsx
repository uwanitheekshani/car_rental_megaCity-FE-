import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs'; 

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    const forgotPassword = async (credentials) => {
        try {
            // Convert data to URL-encoded format using qs.stringify
            const requestData = qs.stringify(credentials);

            const response = await axios.post('http://localhost:8080/MegaCity_war_exploded/password-reset', requestData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            return response.data; // Return success message
        } catch (error) {
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await forgotPassword({ email, action: 'forgotPassword' });
            
            if (response.includes('OTP sent successfully')) {
                localStorage.setItem('email', email); // Store email for verification step
                navigate('/verify-otp'); // Navigate to OTP verification page
            } else {
                setErrorMessage('Failed to send OTP, please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage(error.response ? error.response.data : 'Something went wrong!');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3>Forgot Password</h3>
                        </div>
                        <div className="card-body">
                            {message && <div className="alert alert-success">{message}</div>}
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Enter your email</label>
                                    <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <button type="submit" className="btn btn-primary">Send OTP</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
