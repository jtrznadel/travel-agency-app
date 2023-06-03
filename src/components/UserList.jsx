import React, { useEffect, useState } from 'react';
import axios from 'axios';
import serverAddress from '../constants/serverFile';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: `${serverAddress}/account`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {}
      });
      setUsers(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    console.log(user.id);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleUpdate = async () => {
    // Logika aktualizacji użytkownika
    // Możesz użyć wartości `selectedUser` i `inputValue`

    try {
      await axios({
        method: 'put',
        url: `${serverAddress}/account/${selectedUser.id}?roleId=${inputValue}`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {}
      });

      fetchUsers();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleDelete = async () => {
    // Logika usuwania użytkownika
    // Możesz użyć wartości `selectedUser`

    try {
      await axios({
        method: 'delete',
        url: `${serverAddress}/account/${selectedUser.id}`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {}
      });

      // Aktualizuj listę użytkowników bez usuniętego użytkownika
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== selectedUser.id));

      setSelectedUser(null); // Zresetuj zaznaczonego użytkownika po usunięciu
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const renderUsers = () => {
    return users.map((user) => {
      const isSelected = user === selectedUser;

      return (
        <div
          key={user.id}
          className={`user p-4 mb-4 rounded-lg shadow-md cursor-pointer ${
            isSelected ? 'bg-green-500/75' : 'bg-white/75'
          }`}
          onClick={() => handleSelectUser(user)}
        >
          <div className="user-info">
            <div className="user-id">ID: {user.id}</div>
            <div className="user-email">Email: {user.email}</div>
            <div className="user-role">Role: {user.roleId}</div>
            <div className="user-phone">Phone: {user.phoneNumber}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full p-4 text-right">
       
      <button
  onClick={handleUpdate}
  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
>
  Update
</button>
<input
  type="number"
  min="1"
  max="3"
  value={inputValue}
  onChange={handleInputChange}
  placeholder="Enter role (1, 2, or 3)"
  className="w-40 p-2 mr-10 ml-2 rounded-lg border border-gray-300 mb-4"
/>
<button
  onClick={handleDelete}
  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
>
  Delete User
</button>
</div>
<div className="w-full content mx-5">{renderUsers()}</div>
</div>
);
};

export default UserList;
