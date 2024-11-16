/*import ListUsers from '../components/ListUsers/ListUsers';

const ListUsersPage = () => {
  return (
    <div>
      <ListUsers/>
    </div>
  );
};

export default ListUsersPage;*/
import React from 'react';
import ListUsers from '../components/ListUsers/ListUsers';

const ListUsersPage: React.FC = () => {
  return (
    <div className="list-users-page">
      <ListUsers />
    </div>
  );
};

export default ListUsersPage;
