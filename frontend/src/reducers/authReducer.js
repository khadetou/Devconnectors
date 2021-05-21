import { REGISTER_FAIL, REGISTER_SUCCESS } from '../actions/types';

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
        case REGISTER_SUCCESS:
            localStorage.setItem('token', preload.token);
            return{
                ...state,
                ...preload,
                isAuthenticated: true,
                loading: false,
            }
        case REGISTER_FAIL:
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