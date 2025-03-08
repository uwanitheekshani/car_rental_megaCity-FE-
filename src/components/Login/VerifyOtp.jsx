import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import qs from "qs"; // Import qs to encode form data


const VerifyOtp = () => {
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = localStorage.getItem("email");

        if (!email) {
            setErrorMessage("Email not found. Please try again.");
            return;
        }

        if (!otp.trim()) {
            setErrorMessage("Please enter the OTP.");
            return;
        }

        try {
            const requestData = qs.stringify({
                action: "verifyOtp",
                email: email,
                otpCode: otp.trim(), // Trim spaces from OTP
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
            navigate("/reset-password");
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            setErrorMessage(error.response ? error.response.data : "Invalid or expired OTP.");
        }
    };



    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3>Verify OTP</h3>
                        </div>
                        <div className="card-body">
                            {message && <div className="alert alert-success">{message}</div>}
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="otp" className="form-label">Enter OTP</label>
                                    <input type="text" id="otp" className="form-control" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                                </div>
                                <button type="submit" className="btn btn-primary">Verify OTP</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyOtp;
