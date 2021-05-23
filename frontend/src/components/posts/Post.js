import React, {useEffect,Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPosts} from '../../actions/postAction';
import Spinner from '../layout/Spinner';
import PostItem from './/PostItem';
const Post = () => {
    const dispatch = useDispatch();
    const {posts, loading} = useSelector(state => state.post)

    useEffect(()=>{
        dispatch(getPosts())
    },[dispatch])
    return (
        <section className="container">
            {loading ? <Spinner/> : 
            (<Fragment>
               <h1 className="text-large text-primary">Posts</h1>
               <p className="lead">
                   <i className="fas fa-user"></i> Welcome to the community
               </p>
               {/* Post form  */}
               <div className="posts">
                   {posts !==null && posts.map((post,idx)=>(
                       <PostItem key={idx} post={post}/>
                   ))}
               </div>
            </Fragment>)}
        </section>
    )
}

export default Post
