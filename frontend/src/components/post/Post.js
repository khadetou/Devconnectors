import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from '../layout/Spinner';
import {getPost} from '../../actions/postAction';
import PostItem from '../posts/PostItem';
import {Link} from  'react-router-dom';
const Post = ({match}) => {
    const dispatch = useDispatch();
    const {post, loading} = useSelector(state=>state.post)
    useEffect(()=>{
        dispatch(getPost(match.params.id));
    }, [dispatch, match])

    return (
        <section className="container">
           {loading? <Spinner/> : 
           <Fragment>
               <Link to="/posts" className="btn">Back to posts</Link>
               <PostItem post={post} showActions={false}/>
           </Fragment>
           }
        </section>
    )
}

export default Post;
