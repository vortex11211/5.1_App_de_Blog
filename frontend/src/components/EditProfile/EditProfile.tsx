import React, { useState, useEffect } from 'react';
import authService from '../../services/authService';
import '../../assets/styles/EditProfile.css'

const EditProfile: React.FC = () => {
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      setUsername(user.username);
    }
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.updateProfile(username, oldPassword, newPassword);
      setSuccess('Profile updated successfully');
      setError(null);
    } catch (error) {
      setError('Error updating profile');
      setSuccess(null);
      console.error('Error updating profile', error);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Editar Perfil</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleUpdate} className="edit-profile-form">
        <div className="input-container">
          <label htmlFor="username">Nombre de Usuario</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="oldPassword">Old Password</label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="edit-profile-button">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;


