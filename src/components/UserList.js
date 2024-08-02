// src/components/UserList.js
import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../actions/userActions';
import UserTable from './UserTable';
import Filter from './Filter';

const UserList = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.users);

    const [skip, setSkip] = useState(0);
    const [limit] = useState(10);
    const [sort, setSort] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [filters, setFilters] = useState({});

   
    useEffect(() => {
        console.log('Fetching users with params:', limit, skip, sort, sortOrder, filters);
        dispatch(fetchUsers(limit, skip, sort,sortOrder, filters));
    }, [dispatch, skip, limit, sort,sortOrder, filters]);

    // useEffect(() => {
    //     console.log('Users updated:', users); // Log updated users to verify rendering
    // }, [users]);
    
    // const handleSort = (field) => {
    //     console.log('Sorting by:', field);
    //     setSort(field);
    //     setSkip(0);
    // };

    const handleSort = (field) => {
        console.log('Sorting by:', field);
        if (sort === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order
        } else {
            setSort(field);
            setSortOrder('asc'); // Default to ascending on new sort field
        }
        setSkip(0);
    };



    const handleFilter = (filterType, value) => {
        console.log('Filtering by:', filterType, 'with value:', value); 
        setFilters({ ...filters, [filterType]: value });
        setSkip(0);
    };

    const handleLoadMore = () => {
        setSkip(skip + limit); // Increment skip to fetch the next set of users
    };

    // return (
    //     // <div>
    //     //     <h1>Employees</h1>
    //     //     <Filter handleFilter={handleFilter} />
    //     //     {loading ? <p>Loading...</p> : <UserTable users={users} handleSort={handleSort} />}
    //     //     {error && <p>{error}</p>}
    //     //     {!loading && users.length > 0 && (
    //     //         <button onClick={handleLoadMore}>Load More</button>
    //     //     )}
    //     // </div>
    //     <div>
    //     <h1>Employees</h1>
    //     <Filter handleFilter={handleFilter} />
    //     {loading ? <p>Loading...</p> : (
    //         <UserTable 
    //             users={users} 
    //             handleSort={handleSort} 
    //             sort={sort} 
    //             sortOrder={sortOrder} 
    //         />
            
    //     )}
    //     {error && <p>{error}</p>}
    //     {!loading && users.length > 0 && (
    //         <button onClick={handleLoadMore}>Load More</button>
    //     )}
    // </div>



    return (
        <div>
            <h1>Employees</h1>
            <Filter handleFilter={handleFilter} />
            {loading ? <p>Loading...</p> : (
                users.length > 0 ? (
                    <UserTable 
                        users={users} 
                        handleSort={handleSort} 
                        sort={sort} 
                        sortOrder={sortOrder} 
                    />
                ) : (
                    <p>No available data</p>
                )
            )}
            {error && <p>{error}</p>}
            {!loading && users.length > 0 && (
                <button onClick={handleLoadMore}>Load More</button>
            )}
        </div>

    );
};

export default UserList;
