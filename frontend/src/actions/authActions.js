import { AUTH_ERROR, REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL, LOG_OUT } from './types';
import {setAlert} from './alertAction';
import axios from "axios";
import setAuthToken from '../utils/setAuthToken';


//Load user
export const loadUser = ()=> async dispatch =>{
   
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try {
        const {data} =  await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            preload: data
        })

      
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

//REGISTER USER
export const register = ({name, email, password}) => async dispatch =>{

    const config ={
        headers:{
            'Content-Type': 'application/json',
        }
    }

    const body = JSON.stringify({name, email, password});

    try {
        const {data} = await axios.post('/api/users', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            preload: data
        });
        dispatch(loadUser())
    } catch (er) {
        const error = er.response.data.errors;
        if(error){
            error.forEach(err => dispatch(setAlert(err.msg, 'danger', 6000)));
        }

        dispatch({
            type: REGISTER_FAIL,
        })
    }
}


//LOGIN USER
export const login = ({email, password}) => async dispatch =>{

    const config ={
        headers:{
            'Content-Type': 'application/json',
        }
    }

    const body = JSON.stringify({email, password});

    try {
        const {data} = await axios.post('/api/auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            preload: data
        });
        dispatch(loadUser())

    } catch (er) {
        const error = er.response.data.errors;
        if(error){
            error.forEach(err => dispatch(setAlert(err.msg, 'danger', 6000)));
        }
        dispatch({
            type: LOGIN_FAIL,
        })
    }
}

//LOG OUT / CLEAR PROFILE
export const logout = () => dispatch =>{
    dispatch({
        type: LOG_OUT
    })
}
