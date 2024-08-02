// src/components/UserTable.js
import React from 'react';

const UserTable = ({ users, handleSort,sort, sortOrder }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th onClick={() => handleSort('id')}>ID  {sort === 'id' && (sortOrder === 'asc' ? ' ↑' : ' ↓')}</th>
                    <th>Image</th>
                    <th onClick={() => handleSort('fullName')}>Full Name  {sort === 'fullName' && (sortOrder === 'asc' ? ' ↑' : ' ↓')}</th>
            
                    <th>Demography</th>
                    <th>Designation</th>
                    <th>Location</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td><img src={user.image} alt={user.fullName} /></td>
                        <td>{user.fullName}</td>
                        
                        <td>{user.demography}</td>
                        <td>{user.designation}</td>
                        <td>{user.location}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserTable;
