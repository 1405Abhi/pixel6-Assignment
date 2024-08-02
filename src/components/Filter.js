// src/components/Filter.js
import React from 'react';

const Filter = ({ handleFilter }) => {
    return (
        <div>
            <label>
                Filter by Country:
                <input 
                    type="text" 
                    placeholder="Enter country" 
                    onChange={(e) => handleFilter('country', e.target.value)} 
                />
            </label>
            <label>
                Filter by Gender:
                <select onChange={(e) => handleFilter('gender', e.target.value)}>
                    <option value="all">All</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </label>
        </div>
    );
};

export default Filter;
