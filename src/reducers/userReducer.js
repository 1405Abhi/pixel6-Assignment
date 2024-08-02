// src/reducers/userReducer.js
import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
} from '../actions/userActions';

const initialState = {
    loading: false,
    users: [],
    error: '',
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return { ...state, loading: true, error: '' };
        case FETCH_USERS_SUCCESS:
            console.log('Reducer Payload:', action.payload); 
            return { 
                ...state, 
                loading: false, 
                users: action.isNewFetch ? action.payload : [...state.users, ...action.payload] 
            };
        case FETCH_USERS_FAILURE:
            console.log('Reducer Error:', action.payload); 
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
