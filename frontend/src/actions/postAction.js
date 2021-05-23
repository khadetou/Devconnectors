import axios from 'axios';
import { ADD_COMMENT, ADD_POSTS, DELETE_POST, GET_POST, GET_POSTS, POST_ERROR, REMOVE_COMMENT, UPDATE_LIKES } from './types';
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


//GET ONE POST
export const getPost = (id)=> async dispatch=>{

    try {
        const {data} = await axios.get(`/api/posts/${id}`);
        dispatch({
            type: GET_POST,
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

//ADD POST
export const addPost = (formData)=> async dispatch=>{
    try {
        const config ={
            headers:{
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('/api/posts', formData, config);
        dispatch({
            type: ADD_POSTS,
            preload: data
        })

        dispatch(setAlert('POST ADDED SUCCESSFULLY', 'success', 6000))

    } catch (error) {
        dispatch({
            type: POST_ERROR,
            preload: {msg:error.response, statusCode: error.response.statusCode}
        })
    }
}

//ADD COMMENT 
export const addComment = (postId, formData)=> async dispatch=>{
    try {
        const config ={
            headers:{
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post(`/api/posts/comment/${postId}`, formData, config);
        dispatch({
            type: ADD_COMMENT,
            preload: data
        })

        dispatch(setAlert('COMMENT ADDED SUCCESSFULLY', 'success', 6000))

    } catch (error) {
        dispatch({
            type: POST_ERROR,
            preload: {msg:error.response, statusCode: error.response.statusCode}
        })
    }
}


//ADD COMMENT 
export const deleteComment = (postId, commentId)=> async dispatch=>{
    try {
       

        await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT,
            preload: commentId
        })

        dispatch(setAlert('COMMENT REMOVED', 'danger', 6000))

    } catch (error) {
        dispatch({
            type: POST_ERROR,
            preload: {msg:error.response, statusCode: error.response.statusCode}
        })
    }
}