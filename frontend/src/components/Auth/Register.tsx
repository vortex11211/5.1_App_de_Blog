import React, { useState } from 'react';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('simpleUser');
  const [adminKey, setAdminKey] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.register(username, email, password,role,adminKey);
      navigate('/login');
    } catch (error) {
      setError('Error al registrarse');
      console.error('Error al registrarse:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <i className="fas fa-user-plus"></i> {/* Icono de registro */}
          <h2>Register</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <i className="fas fa-user"></i>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <i className= "fas fa-user-tag"></i>
            <select value={role} onChange={(e)=>setRole(e.target.value)} required>
              <option value="simpleUser">User</option>
              <option value="admin">Admin</option>
            </select>
            </div>
            {role==='admin'&&(
              <div className="input-container">
                <i className="fas fa-key"></i>
                <input
                type="password"
                placeholder="Admin Key"
                value={adminKey}
                onChange={(e)=>setAdminKey(e.target.value)}
                required
                />
              </div>
            )}
          <button type="submit" className="login-button">Register</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Register;
