import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {addComment} from '../../actions/postAction';

const CommentForm = ({postId}) => {
    const dispatch = useDispatch();

    const [text, setText] = useState('');
    const onChange =(e)=>{
        setText(e.target.value)
    }
    const onSubmit = (e)=>{
        e.preventDefault()
        dispatch(addComment(postId, {text}))
        setText('')
    }
    return (
        <div className="post-form">
            <div className="bg-primary p">
            <h3>Leave a Comment</h3>
            </div>
            <form className="form my-1" onSubmit={(e)=>onSubmit(e)}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Create a post"
                    required
                    value={text}
                    onChange={(e)=>onChange(e)}
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

export default CommentForm;
