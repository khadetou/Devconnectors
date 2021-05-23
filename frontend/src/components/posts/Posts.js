import React, {useEffect,Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPosts} from '../../actions/postAction';
import PostForm from './PostForm';
import Spinner from '../layout/Spinner';
import PostItem from './/PostItem';
const Posts = () => {
    const dispatch = useDispatch();
    const {posts, loading} = useSelector(state => state.post)
    const alert = useSelector(state=>state.alert);
    useEffect(()=>{
        dispatch(getPosts())
    },[dispatch])
    const alerts = alert.map((al, idx)=>(
        <div key={idx} className={`alert alert-${al.alertType}`}>{al.msg}</div>
    ));
    let lastItem = alerts.length-1;
    return (
        <section className="container">
                 {alerts[lastItem]}
            {loading ? <Spinner/> : 
            (<Fragment>
               <h1 className="text-large text-primary">Posts</h1>
               <p className="lead">
                   <i className="fas fa-user"></i> Welcome to the community
               </p>
                <PostForm/>
               <div className="posts">
                   {posts !==null && posts.map((post,idx)=>(
                       <PostItem key={idx} post={post}/>
                   ))}
               </div>
            </Fragment>)}
        </section>
    )
}

export default Posts;
