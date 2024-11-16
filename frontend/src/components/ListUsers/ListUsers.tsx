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
        setUsers(response.users.map((user: any) => user.props)); // Transformar la respuesta
      } catch (error) {
        setError('Error al obtener los usuarios o no tienes permiso para realizar esta acción');
        console.error('Error al obtener los usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="list-users-container">
      <h2>All Users</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="users-list">
        {users.map(user => (
          <div className="user-card" key={user.id}>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <p>Banned: {user.banned ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListUsers;
