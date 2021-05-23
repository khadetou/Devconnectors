import { ADD_COMMENT, ADD_POSTS, DELETE_POST, GET_POST, GET_POSTS, POST_ERROR, REMOVE_COMMENT, UPDATE_LIKES } from '../actions/types';

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
        case ADD_POSTS:
            return{
                ...state,
                posts: [preload, ...state.posts],
                loading: false
            }
        case DELETE_POST:
            return{
                ...state,
                posts: state.posts.filter(post => post._id !== preload)
            }
        case POST_ERROR:
            return{
                ...state,
                error: preload,
                loading: false
            }
        case UPDATE_LIKES:
            return{
                ...state,
                posts: state.posts.map((post)=>post._id === preload.id ? {...post, likes: preload.likes} : post),
                loading: false
            }
        case ADD_COMMENT:{
            return{
                ...state,
                post: {...state.post, comments: preload},
                loading: false
            }
        }
        case REMOVE_COMMENT:
            return{
                ...state,
                post: {
                    ...state.post,
                    comments: state.post.comments.filter((comment)=>comment._id !== preload)},
                loading: false
            }
        default:
           return state;
    }
}