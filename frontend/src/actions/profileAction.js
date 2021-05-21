import axios from 'axios';
import { setAlert }  from './alertAction';


import { CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR } from './types';

//GET CURRENT USERS PROFILE
export const getCurrentProfile = () => async dispatch =>{

    try {
        const {data} = await axios.get('/api/profiles/me');
        dispatch({
            type: GET_PROFILE,
            preload: data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            preload: {msg: error.response.data.msg, status: error.response.status}
        })
    }
}
//CLEAR PROFILE 
export const clearProfile = ()=> dispatch=>{
    dispatch({
        type: CLEAR_PROFILE
    })
}