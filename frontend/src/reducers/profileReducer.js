import {CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE} from '../actions/types';


const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state= initialState, action)=>{
    const {preload, type} = action
    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return{
                ...state,
                profile: preload,
                loading: false
            } 
        case PROFILE_ERROR:
            return{
                ...state,
                error: preload,
                loading: false
            }
        case CLEAR_PROFILE:
            return{
                ...state,
                profile: null,
                repos: [],
                loading: false
            }
        default:
            return state;
    }
}