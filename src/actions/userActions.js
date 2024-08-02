// src/actions/userActions.js
import axios from 'axios';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const fetchUsers = (limit, skip, sort = '',sortOrder = 'asc', filters = {}) => async (dispatch) => {
    dispatch({ type: FETCH_USERS_REQUEST });

    try {
        console.log('Fetching users with filters:', filters);
        const response = await axios.get('https://dummyjson.com/users', {
            params: { limit, skip, sort, ...filters },
        });

        console.log('API Response:', response.data.users);

        let filteredUsers = response.data.users.map(user => ({
            id: user.id,
            image: user.image,
            fullName: `${user.firstName}  ${user.lastName}`,
            demography: `${user.gender}/${user.age}`,
            designation: user.company.title,
            location: `${user.address.state}, ${user.address.country}`,
        }));


        if (filters.country) {
            filteredUsers = filteredUsers.filter(user => user.location.toLowerCase().includes(filters.country.toLowerCase()));
        }

        // if (filters.gender) {
        //     filteredUsers = filteredUsers.filter(user => user.gender === filters.gender.toLowerCase());
        // }


        // if (filters.gender) {
        //     filteredUsers = filteredUsers.filter(user => user.demography.includes(filters.gender));
        // }
        if (filters.gender && filters.gender !== 'all') {
            filteredUsers = filteredUsers.filter(user => user.demography.startsWith(filters.gender));
        }
        console.log('Mapped Users:', filteredUsers); 


        // if (sort) {
        //     filteredUsers.sort((a, b) => {
        //         if (sortOrder === 'asc') {
        //             if (sort === 'demography') {
        //                 return a.demography.localeCompare(b.demography);
        //             }
        //             return a[sort].localeCompare(b[sort]);
        //         } else {
        //             if (sort === 'demography') {
        //                 return b.demography.localeCompare(a.demography);
        //             }
        //             return b[sort].localeCompare(a[sort]);
        //         }
        //     });
        // }


        if (sort) {
            filteredUsers.sort((a, b) => {
                if (sortOrder === 'asc') {
                    if (sort === 'id') {
                        return a.id - b.id;
                    } else if (sort === 'demography') {
                        return a.demography.localeCompare(b.demography);
                    }
                    return a[sort].localeCompare(b[sort]);
                } else {
                    if (sort === 'id') {
                        return b.id - a.id;
                    } else if (sort === 'demography') {
                        return b.demography.localeCompare(a.demography);
                    }
                    return b[sort].localeCompare(a[sort]);
                }
            });
        }


        // Apply sorting
        // if (sort) {
        //     filteredUsers.sort((a, b) => {
        //         if (sortOrder === 'asc') {
        //             return a[sort] > b[sort] ? 1 : -1;
        //         } else {
        //             return a[sort] < b[sort] ? 1 : -1;
        //         }
        //     });
        // }


        // if (sort) {
        //     filteredUsers.sort((a, b) => {
        //         if (sortOrder === 'asc') {
        //             return a[sort].localeCompare(b[sort]);
        //         } else {
        //             return b[sort].localeCompare(a[sort]);
        //         }
        //     });
        // }

        // if (sort) {
        //      filteredUsers.sort((a, b) => {
        //         if (a[sort] < b[sort]) return -1;
        //         if (a[sort] > b[sort]) return 1;
        //         return 0;
        //     });
        // }

        console.log('Sorted Users:', filteredUsers); 

        dispatch({
            type: FETCH_USERS_SUCCESS,
            payload: filteredUsers,
            isNewFetch: skip === 0, // Check if it's a new fetch or pagination
        });
    } catch (error) {
        console.log('Fetch Error:', error.message);
        dispatch({
            type: FETCH_USERS_FAILURE,
            payload: error.message,
        });
    }
};

