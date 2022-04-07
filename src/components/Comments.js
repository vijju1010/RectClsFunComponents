import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Comment from './Comment';

const Comments = (props) => {
    var [newComment, setNewComment] = React.useState('');
    var handleChange = (e) => {
        setNewComment(e.target.value);
    };
    return (
        <div>
            <input
                type='text'
                placeholder='Comment'
                value={newComment}
                onChange={handleChange}
                onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                        var id = uuidv4();
                        var newCmment = {
                            id: id,
                            content: newComment,
                        };
                        props.addComment(newCmment, props.postid);
                        // props.comment.comments.push(newCmment);
                        setNewComment('');
                    }
                }}
            />
            <ul>
                {props.comment.comments.map((comment) => {
                    return (
                        <Comment
                            key={uuidv4()}
                            commentContent={comment.content}
                        />
                        // <li key={uuidv4()}>
                        //     <p>{comment.content}</p>
                        // </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Comments;
