import React, { useState, useEffect } from 'react';
import authService from '../../services/authService';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    // Obtener la información del perfil del usuario
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.updateProfile(username, oldPassword, newPassword);
      alert('Profile updated successfully');
      // Redireccionar o actualizar el estado del componente
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleUpdate}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          disabled
        />
        <label>Old Password:</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
