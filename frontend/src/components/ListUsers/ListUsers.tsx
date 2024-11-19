import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import userService from '../../services/UserService';
import '../../assets/styles/ListUsers.css';

const ListUsers: React.FC = () => {
  useContext(AuthContext);
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUsers();
        setUsers(response.users.map((user: any) => user.props)); 
      } catch (error) {
        setError('No tienes permiso para realizar esta acción');
        console.error('Error al obtener los usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleToggleBan = async (userId: number) => {
    try {
      await userService.toggleBanUser(userId);
      const response = await userService.getAllUsers();
      const formattedUsers = response.users.map((user: any) => user.props); 
      setUsers(formattedUsers);
    } catch (error) {
      setError('Error al banear/desbanear el usuario');
      console.error('Error al banear/desbanear el usuario:', error);
    }
  };
 
  return (
    <div className="list-users-container">
      <h2>All Users</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="users-list">
        {users.map(user => (
          <div className={`user-card ${user.banned ? 'banned' : ''}`} key={user.id}>
            <h2>Username: {user.username}</h2>
            <p>Email: {user.email}</p>
            <p className="user-role">Role: {user.role}</p>
            <p className="user-status">Banned: {user.banned ? 'Yes' : 'No'}</p>
            <button
              className="ban-user-button"
              onClick={() => handleToggleBan(user.id)}
            >
              {user.banned ? 'Unban User' : 'Ban User'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListUsers;
/*
    fetchUsers();
  }, []);
  const handleToggleBan = async (userId: number) => {
    try {
      await userService.toggleBanUser(userId);
      const response = await userService.getAllUsers();
      const formattedUsers = response.users.map((user: any) => user.props); 
      setUsers(formattedUsers);
    } catch (error) {
      setError('Error al banear/desbanear el usuario');
      console.error('Error al banear/desbanear el usuario:', error);
    }
  };

return (
    <div className="list-users-container">
      <h2>All Users</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="users-list">
        {users.map(user => (
          <div className={`user-card ${user.banned ? 'banned' : ''}`} key={user.id}>
            <h2>Username: {user.username}</h2>
            <p>Email: {user.email}</p>
            <p className="user-role">Role: {user.role}</p>
            <p className="user-status">Banned: {user.banned ? 'Yes' : 'No'}</p>
            <button
              className="ban-user-button"
              onClick={() => handleToggleBan(user.id)}
            >
              {user.banned ? 'Unban User' : 'Ban User'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListUsers;*/
