import React from 'react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import {useSelector, useDispatch} from 'react-redux';
import {removeLikes,addLikes, deletePost} from '../../actions/postAction';
const PostItem = ({post:{ _id, text, name, avatar, user, likes, comments, date}}) => {
    const auth = useSelector(state=>state.auth);
    const dispatch = useDispatch();

    const unLike =()=>{
        dispatch(removeLikes(_id))
    }
    const like = ()=>{
        dispatch(addLikes(_id))
    }
    const postDelete = ()=>{
        dispatch(deletePost(_id))
    }
  

    return (
        <div className="post bg-white p-1 my-1">
          
            <div>
                <a href="profile.html">
                    <img
                    className="round-img"
                    src={avatar}
                    alt=""
                    />
                    <h4>{name}</h4>
                </a>
            </div>
            <div>
                <p className="my-1">
                    {text}
                </p>
                <p className="post-date">
                    Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
                </p>
                <button onClick={()=>like()} type="button" className="btn btn-light">
                    <i className="fas fa-thumbs-up"></i> {' '}
                   {likes.length>0 && <span>{likes.length}</span>}
                </button>
                <button onClick={()=>unLike()} type="button" className="btn btn-light">
                    <i className="fas fa-thumbs-down"></i>
                </button>
                <Link to={`/post/${_id}`} className="btn btn-primary">
                    Discussion {comments.length>0 && <span className='comment-count'>{comments.length}</span>}
                </Link>
              {!auth.loading && user === auth.user._id &&
              (<button      
                type="button"
                className="btn btn-danger"
                onClick={()=>postDelete()}
                >
                    <i className="fas fa-times"></i>
                </button>)}
            </div>
      </div>
    )
}

export default PostItem
