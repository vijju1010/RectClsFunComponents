import React from 'react';
import { Flex, Box, Heading, Spacer, Button } from '@chakra-ui/react';
import Comments from './Comments';

const FunPost = (props) => {
    return (
        <div>
            <Flex>
                <Box p='2'>
                    <Heading size='md'>{props.post.title}</Heading>
                </Box>
                <Spacer />
                <Box>
                    <Button
                        colorScheme='teal'
                        onClick={() => props.editPost(props.post.id)}
                        mr='4'
                        className='btn btn-success'>
                        Edit
                    </Button>
                    <Button
                        colorScheme='teal'
                        onClick={() => props.delPost(props.post.id)}
                        className='btn btn-danger'>
                        Delete
                    </Button>
                </Box>
            </Flex>
            <div>
                <p>{props.post.content}</p>
            </div>
            <div className='d-flex justify-content-between'>
                <button
                    className='btn btn-success'
                    style={{ height: '40px' }}
                    onClick={() => {
                        props.incLike(props.post.id);
                    }}>
                    Like : {props.post.likes}
                </button>
                <button
                    onClick={() => {
                        props.toggleshowComments();
                    }}>
                    Comments
                </button>

                <Comments
                    addComment={props.addComment}
                    postid={props.post.id}
                    style={{ display: props.showComments ? 'block' : 'none' }}
                    comment={props.post.comment}
                />
                <button
                    className='btn btn-info'
                    style={{ height: '40px' }}
                    onClick={() => props.dicLike(props.post.id)}>
                    DisLike : {props.post.dislikes}
                </button>
            </div>
        </div>
    );
};

export default FunPost;
