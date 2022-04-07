import React, { Component, memo } from 'react';
import { Flex, Box, Heading, Spacer, Button } from '@chakra-ui/react';

export default class Post extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    static getDerivedStateFromProps(props, state) {
        console.log('getDerived', props.post.title);
        return props.post;
    }

    render() {
        console.log('renderpost', this.props.post.title);
        return (
            <div>
                <Flex>
                    <Box p='2'>
                        <Heading size='md'>{this.props.post.title}</Heading>
                    </Box>
                    <Spacer />
                    <Box>
                        <Button
                            colorScheme='teal'
                            onClick={() =>
                                this.props.editPost(this.props.post.id)
                            }
                            mr='4'
                            className='btn btn-success'>
                            Edit
                        </Button>
                        <Button
                            colorScheme='teal'
                            onClick={() =>
                                this.props.delPost(this.props.post.id)
                            }
                            className='btn btn-danger'>
                            Delete
                        </Button>
                    </Box>
                </Flex>
                <div>
                    <p>{this.props.post.content}</p>
                </div>
                <div className='d-flex justify-content-between'>
                    <button
                        className='btn btn-success'
                        onClick={() => {
                            this.props.incLike(this.props.post.id);
                        }}>
                        Like : {this.props.post.likes}
                    </button>
                    <button
                        className='btn btn-info'
                        onClick={() => this.props.dicLike(this.props.post.id)}>
                        DisLike : {this.props.post.dislikes}
                    </button>
                </div>
            </div>
        );
    }
}
// export default memo(Post);
