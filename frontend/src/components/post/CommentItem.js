import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteComment} from '../../actions/postAction';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
const CommentItem = ({comment:{_id, name, text, avatar, user, date}, postId}) => {
const auth = useSelector(state=>state.auth);
 const dispatch = useDispatch();

    return (
        <div class="post bg-white p-1 my-1">
            <div>
                <Link href={`/profile/${user}`}>
                    <img
                    className="round-img"
                    src={avatar}
                    alt=""
                    />
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">
                   {text}
                </p>
                <p className="post-date">
                    Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
                </p>
                {!auth.loading && user === auth.user._id && (
                    <button onClick={e=>dispatch(deleteComment(postId, _id))} type="button" className="btn btn-danger">
                        <i className="fas fa-times"></i>
                    </button>
                )}
            </div>
      </div>
    )
}

export default CommentItem;
