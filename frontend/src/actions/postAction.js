import axios from 'axios';
import { DELETE_POST, GET_POSTS, POST_ERROR, UPDATE_LIKES } from './types';
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

//ADD LIKES
export const addLikes = (id)=> async dispatch=>{
    try {
        const {data} = await axios.put(`/api/posts/likes/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            preload: {id, likes:data}
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            preload: {msg:error.response, statusCode: error.response.statusCode}
        })
    }
}

//REMOVE LIKES
export const removeLikes = (id)=> async dispatch=>{

    try {
        const {data} = await axios.put(`/api/posts/unlikes/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            preload: {id, likes:data}
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            preload: {msg:error.response, statusCode: error.response.statusCode}
        })
    }
}

//DELETE POST 
export const deletePost = (id)=> async dispatch=>{

    try {
        await axios.delete(`/api/posts/${id}`);
        dispatch({
            type: DELETE_POST,
            preload: id
        })
        dispatch(setAlert('POST DELETED SUCCESSFULLY', 'danger', 6000))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            preload: {msg:error.response, statusCode: error.response.statusCode}
        })
    }
}