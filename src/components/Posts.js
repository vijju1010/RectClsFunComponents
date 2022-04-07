import React, { Component } from 'react';
import Post from './Post';
import { v4 as uuidv4 } from 'uuid';
export default class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newPost: '',
            newPostContent: '',
            editch: false,
            editid: null,
            posts: [],
        };
    }

    componentDidUpdate() {
        // console.log('componentDidUpdate', this.state);
        localStorage.setItem('posts', JSON.stringify(this.state.posts));
    }
    componentDidMount() {
        // console.log('componentDidMount', this.state);
        let posts = JSON.parse(localStorage.getItem('posts'));
        if (posts) {
            this.setState({
                posts: posts,
            });
        }
    }

    handleChange = (e) => {
        console.log(e);
        this.setState({
            newPost: e.target.value,
        });
    };
    handleContentChange = (e) => {
        console.log(e);
        this.setState({
            newPostContent: e.target.value,
        });
    };
    handleSubmit = () => {
        var newPost = {
            id: uuidv4(),
            title: this.state.newPost,
            content: this.state.newPostContent,
            likes: 0,
            dislikes: 0,
        };
        this.setState({
            posts: [...this.state.posts, newPost],
        });
    };
    incLike = (postid) => {
        console.log('incLike', postid);
        let posts = this.state.posts;
        posts.forEach((item, index) => {
            console.log('post', item);
            if (item.id == postid) {
                item.likes++;
                return;
            }
        });
        this.setState({
            posts: posts,
        });
    };
    dicLike = (postid) => {
        let posts = this.state.posts;
        posts.forEach((item, index) => {
            if (item.id == postid) {
                console.log('dic');
                item.dislikes++;
                return;
            }
        });
        this.setState({
            posts: posts,
        });
    };
    editPost = (postid) => {
        // console.log('editPost', postid);
        let posts = this.state.posts;
        posts.forEach((item, index) => {
            if (item.id == postid) {
                this.setState({
                    newPost: item.title,
                    newPostContent: item.content,
                    editch: true,
                    editid: postid,
                });
                return;
            }
        });
    };
    handleUpdate = () => {
        let posts = this.state.posts;
        posts = posts.map((item, index) => {
            if (item.id == this.state.editid) {
                item.title = this.state.newPost;
                item.content = this.state.newPostContent;
                return item;
            }
            return item;
        });
        this.setState({
            posts: posts,
            editch: false,
        });
    };
    delPost = (postid) => {
        // console.log('delPost', postid);
        let posts = this.state.posts;
        posts = posts.filter((item, index) => {
            if (item.id == postid) {
                return false;
            }
            return true;
        });
        this.setState({
            posts: posts,
        });
    };
    render() {
        return (
            <div>
                <div className='border m-2 p-2'>
                    Posts
                    <input
                        type='text'
                        placeholder='Enter Post title'
                        value={this.state.newPost}
                        onChange={this.handleChange}
                    />
                    {!this.state.editch && (
                        <button
                            style={{ marginLeft: '10px' }}
                            className='btn btn-secondary'
                            type='button'
                            onClick={this.handleSubmit}>
                            Add Post
                        </button>
                    )}
                    {this.state.editch && (
                        <button
                            style={{ marginLeft: '10px' }}
                            className='btn btn-secondary'
                            type='button'
                            onClick={this.handleUpdate}>
                            Update
                        </button>
                    )}
                    <br />
                    Content :
                    <br />
                    <textarea
                        value={this.state.newPostContent}
                        onChange={this.handleContentChange}
                    />
                </div>
                <ul>
                    {this.state.posts.map((post, index) => (
                        <div>
                            {/* <li>{post.title}</li> */}
                            <div className='border m-1 p-1'>
                                <Post
                                    key={post.id}
                                    post={post}
                                    editPost={this.editPost}
                                    delPost={this.delPost}
                                    incLike={this.incLike}
                                    dicLike={this.dicLike}
                                />
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        );
    }
}
