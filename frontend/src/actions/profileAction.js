import axios from 'axios';
import { setAlert }  from './alertAction';


import { CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE,ACCOUNT_DELETED, GET_PROFILES, GET_REPOS } from './types';

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

//GET ALL PROFILES
export const getAllProfiles = () => async dispatch =>{
        dispatch({type: CLEAR_PROFILE});
    try {
        const {data} = await axios.get('/api/profiles');
        dispatch({
            type: GET_PROFILES,
            preload: data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            preload: {msg: error.response.data.msg, status: error.response.status}
        })
    }
}

//GET PROFILE BY ID
export const getProfileById = (userId) => async dispatch =>{
    dispatch({type: CLEAR_PROFILE});
try {
    const {data} = await axios.get(`/api/profiles/user/${userId}`);
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


//GET GITHUB REPOS
export const getGithubRepos = (username) => async dispatch =>{
try {
    const {data} = await axios.get(`/api/profiles/github/${username}`);
    dispatch({
        type: GET_REPOS,
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

//ADD EXPERIENCE    
export const addExperience = (formData, history)=> async dispatch=>{

    try {
        const config ={
            headers:{
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.put('/api/profiles/experience', formData, config);
    

        dispatch({
            type: UPDATE_PROFILE,
            preload: data
        })
        dispatch(setAlert( 'Experience added', 'success',6000));

            history.push('/dashboard');
    

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


//ADD EDUCATION   
export const addEducation = (formData, history)=> async dispatch=>{

    try {
        const config ={
            headers:{
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.put('/api/profiles/education', formData, config);
    

        dispatch({
            type: UPDATE_PROFILE,
            preload: data
        })
        dispatch(setAlert( 'Education added', 'success',6000));

       
            history.push('/dashboard');
   

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

//DELETE Experience

export const deleteExperience = (id) => async dispatch=>{

    try {
        const {data} = await axios.delete(`/api/profiles/experience/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            preload: data
        })

        dispatch(setAlert( 'Experience deleted', 'danger',6000));

    } catch (error) {
         dispatch({
            type: PROFILE_ERROR,
            preload: {msg: error.response.data.message, status: error.response.status}
        })
    }

}

//DELETE Education
export const deleteEducation = (id) => async dispatch=>{

    try {
        const {data} = await axios.delete(`/api/profiles/education/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            preload: data
        })

        dispatch(setAlert( 'Education deleted', 'danger',6000));

    } catch (error) {
         dispatch({
            type: PROFILE_ERROR,
            preload: {msg: error.response.data.message, status: error.response.status}
        })
    }

}

//DELETE ACCOUNT
export const deleteAccount = () => async dispatch=>{

  if(window.confirm("Are you sure ? This cannot be undone!")){
    try {
        await axios.delete('/api/profiles')
        dispatch({type: CLEAR_PROFILE})
        dispatch({type: ACCOUNT_DELETED})

        dispatch(setAlert( 'Your account has been permenently deleted', 'danger',6000));

    } catch (error) {
         dispatch({
            type: PROFILE_ERROR,
            preload: {msg: error.response.data.message, status: error.response.status}
        })
    }
  }

}