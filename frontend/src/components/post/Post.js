import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from '../layout/Spinner';
import {getPost} from '../../actions/postAction';
import PostItem from '../posts/PostItem';
import {Link} from  'react-router-dom';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
const Post = ({match}) => {
    const dispatch = useDispatch();
    const {post, loading} = useSelector(state=>state.post)
    const alert = useSelector(state=>state.alert);
    useEffect(()=>{
        dispatch(getPost(match.params.id));
    }, [dispatch, match])
    const alerts = alert.map((al, idx)=>(
        <div key={idx} className={`alert alert-${al.alertType}`}>{al.msg}</div>
    ));
    let lastItem = alerts.length -1;
    return (
        <section className="container">
                {alerts[lastItem]}
            { loading ? <Spinner/> : 
           <Fragment>
               <Link to="/posts" className="btn">Back to posts</Link>
               {post !== null && <Fragment>
                <PostItem post={post} showActions={false}/>
                <CommentForm postId={post._id}/>
                <div className="comments">
                    {post.comments.map((comment)=>(
                        <CommentItem key={comment._id} comment ={comment} postId={post._id}/>
                    ))}
                </div>
               </Fragment>}
           </Fragment>}
          
        </section>
    )
}

export default Post;
