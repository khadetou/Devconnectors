import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPosts} from '../../actions/postAction';
import Spinner from '../layout/Spinner';
const Post = () => {
    const dispatch = useDispatch();
    const {posts, loading} = useSelector(state => state.post)

    useEffect(()=>{
        dispatch(getPosts())
    },[dispatch])
    return (
        <div>
            
        </div>
    )
}

export default Post
