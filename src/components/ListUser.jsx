import axios from 'axios';
import { useEffect, useState } from 'react';

export function ListUser() {
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null); 
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios.get('http://localhost:8005/api/').then((response) => {
      setUsers(response.data);
    });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8005/api/?id=${id}`).then(() => {
      getUsers();
    });
  };

  const handleEditClick = (user) => {
    setEditId(user.id);
    setEditFormData({ name: user.name, email: user.email, mobile: user.mobile });
  };

  const handleCancelClick = () => {
    setEditId(null);
    setEditFormData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveClick = (id) => {
    axios
      .put('http://localhost:8005/api/', { ...editFormData, id })
      .then(() => {
        setEditId(null);
        setEditFormData({});
        getUsers();
      });
  };

  return (
    <div>
        <h2 className="list">User List</h2>
        <div className="user-table">
            <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) =>
                    editId === user.id ? (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>
                        <input
                            name="name"
                            value={editFormData.name}
                            onChange={handleChange}
                            className="edit-input"
                        />
                        </td>
                        <td>
                        <input
                            name="email"
                            value={editFormData.email}
                            onChange={handleChange}
                            className="edit-input"
                        />
                        </td>
                        <td>
                        <input
                            name="mobile"
                            value={editFormData.mobile}
                            onChange={handleChange}
                            className="edit-input"
                        />
                        </td>
                        <td>
                        <div className="buttons">
                        <button onClick={() => handleSaveClick(user.id)}>Save</button>
                        <button onClick={handleCancelClick}>Cancel</button>
                        </div>
                        </td>
                    </tr>
                    ) : (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.mobile}</td>
                        <td>
                        <div className="buttons">
                        <button onClick={() => handleEditClick(user)}>Edit</button>
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                        </div>
                        </td>
                    </tr>
                    )
                )}
                </tbody>
            </table>
        </div>
    </div>
  );
}

export default ListUser;