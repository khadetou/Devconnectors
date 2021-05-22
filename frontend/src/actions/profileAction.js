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

//CREATE OR UPDATE 
export const createProfile = (formData, history, edit= false)=> async dispatch=>{
    // console.log(history, formData)
    try {
        const config ={
            headers:{
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('/api/profiles', formData, config);
    

        dispatch({
            type: GET_PROFILE,
            preload: data
        })
        dispatch(setAlert(edit ? 'Profile Updated': 'Profile Created', 'success',6000));

        if(!edit){
            history.push('/dashboard');
        }

    } catch (error) {
       
        if(error){
           dispatch(setAlert(error.response.data.message, 'danger', 6000));
        }
        dispatch({
            type: PROFILE_ERROR,
            preload: {msg: error.response.data.message, status: error.response.status}
        })
    }
}