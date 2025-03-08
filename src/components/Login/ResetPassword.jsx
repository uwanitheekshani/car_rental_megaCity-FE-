import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import qs from "qs"; // Import qs for form data encoding


const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();


    const handleResetPassword = async (e) => {
        e.preventDefault();

        const email = localStorage.getItem("email");

        if (!email) {
            setErrorMessage("Email not found. Please try again.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const requestData = qs.stringify({
                action: "changePassword",
                email: email,
                newPassword: newPassword,
            });

            const response = await axios.post(
                "http://localhost:8080/MegaCity_war_exploded/password-reset",
                requestData,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            console.log("API Response:", response.data);
            setMessage(response.data);
            localStorage.removeItem("email"); // Remove email after password reset
            navigate("/login");
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            setErrorMessage(error.response ? error.response.data : "Error resetting password.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3>Reset Password</h3>
                        </div>
                        <div className="card-body">
                            {message && <div className="alert alert-success">{message}</div>}
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            <form onSubmit={handleResetPassword}>
                                <div className="mb-3">
                                    <label htmlFor="newPassword" className="form-label">New Password</label>
                                    <input type="password" id="newPassword" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                    <input type="password" id="confirmPassword" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                </div>
                                <button type="submit" className="btn btn-primary">Reset Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
