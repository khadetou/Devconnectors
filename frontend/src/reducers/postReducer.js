import { GET_POST, GET_POSTS, POST_ERROR } from '../actions/types';

const initialState = {
    posts :[],
    post: null,
    loading: true,
    error: null
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action)=>{
    const {preload, type} = action;
    switch (type) {
        case GET_POST:
            return{
                ...state,
                post: preload,
                loading: false
            }
        case GET_POSTS:
            return{
                ...state,
                posts: preload,
                loading: null
            }
        case POST_ERROR:
            return{
                ...state,
                error: preload,
                loading: false
            }
    
        default:
           return state;
    }
}