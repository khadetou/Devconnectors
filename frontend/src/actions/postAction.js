import axios from 'axios';
import { GET_POSTS, POST_ERROR } from './types';
import {setAlert} from './alertAction';
//GET ALL POSTS
export const getPosts = ()=> async dispatch=>{

    try {
        const {data} = await axios.get('/api/posts');
        dispatch({
            type: GET_POSTS,
            preload: data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            preload: {msg:error.response, statusCode: error.response.statusCode}
        })
    }
}