import { REGISTER_FAIL, REGISTER_SUCCESS } from './types';
import {setAlert} from './alertAction';
import axios from "axios";

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