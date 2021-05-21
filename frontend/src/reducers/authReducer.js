import { AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOG_OUT, REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED } from '../actions/types';

const initialState ={
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action)=>{
    const {preload, type} = action;
    switch (type) {
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                loading: false,
                user: preload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', preload.token);
            return{
                ...state,
                ...preload,
                isAuthenticated: true,
                loading: false,
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOG_OUT:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
    
        default:
           return state;
    }

}