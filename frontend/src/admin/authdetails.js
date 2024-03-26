import React, { useState, useEffect } from 'react';
import Header from '../admin/Header'

function UserList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users`);
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
        // Handle error, e.g., set an error state
      }
      finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error(error);
      // Handle error, e.g., set an error state
    }
  };

  return (
    <>
      <Header />
      <div className='container-table'>
        <h3>User List</h3>
        <br/>
        {isLoading ? (
          <h3>Loading...</h3>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>isAdmin</th>
                <th>Action</th> {/* New column for delete button */}
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                  <td>
                    <button onClick={() => deleteUser(user._id)} className='deletebutton'>Delete</button>
                  </td> {/* Delete button for each user */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default UserList;
