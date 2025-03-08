import React, { useState } from 'react';
import { registerUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('customer');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
      e.preventDefault();
      try {
          const response = await registerUser({ username, password, email, phone, role });
          alert(response.data.message);
          navigate('/login');
      } catch (error) {
        alert(response.data.message);
          setErrorMessage('Failed to register');
      }
  };

  return (
      <div className="container mt-5">
          <div className="row justify-content-center">
              <div className="col-md-6">
                  <div className="card">
                      <div className="card-header">
                          <h3>Register</h3>
                      </div>
                      <div className="card-body">
                          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                          <form onSubmit={handleRegister}>
                              <div className="mb-3">
                                  <label htmlFor="username" className="form-label">Username</label>
                                  <input type="text" id="username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                              </div>
                              <div className="mb-3">
                                  <label htmlFor="email" className="form-label">Email</label>
                                  <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                              </div>
                              <div className="mb-3">
                                  <label htmlFor="phone" className="form-label">Phone</label>
                                  <input type="text" id="phone" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                              </div>
                             
                              <div className="mb-3">
                                  <label htmlFor="password" className="form-label">Password</label>
                                  <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                              </div>
                              <input type="hidden" id="role" value={role} /> 
                              <button type="submit" className="btn btn-primary">Register</button>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default RegisterForm;
