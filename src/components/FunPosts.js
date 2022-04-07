import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FunPost from './FunPost';

const FunPosts = () => {
    var [posts, setPosts] = useState(
        localStorage.getItem('funposts')
            ? JSON.parse(localStorage.getItem('funposts'))
            : []
    );
    var [newTitle, setNewPost] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [editch, setEditch] = useState(false);
    const [editid, setEditid] = useState(null);

    useEffect(() => {
        localStorage.setItem('funposts', JSON.stringify(posts));
    }, [posts]);

    var handleChange = (e) => {
        setNewPost(e.target.value);
    };
    var handleContentChange = (e) => {
        setNewPostContent(e.target.value);
    };
    var addComment = (comment, postid) => {
        var newPosts = posts.map((post) => {
            if (post.id === postid) {
                post.comment.comments.push(comment);
            }
            return post;
        });
        setPosts(newPosts);
    };
    var handleSubmit = () => {
        var id = uuidv4();
        var newPost = {
            id: id,
            title: newTitle,
            content: newPostContent,
            likes: 0,
            dislikes: 0,
            comment: {
                id: id,
                comments: [
                    {
                        content: 'content 1',
                    },
                ],
            },
        };
        setPosts([...posts, newPost]);
        setNewPost('');
        setNewPostContent('');
    };
    var incLike = (postid) => {
        let postsList = posts;
        var newpostList = postsList.map((item, index) => {
            if (item.id === postid) {
                item.likes++;
            }
            return item;
        });

        // setPosts
        setPosts(newpostList);
    };
    var dicLike = (postid) => {
        let postsList = posts;
        var newpostList = postsList.map((item, index) => {
            if (item.id === postid) {
                item.dislikes++;
            }
            return item;
        });

        // setPosts
        setPosts(newpostList);
    };
    var editPost = (postid) => {
        let postsList = posts;
        postsList.forEach((item, index) => {
            if (item.id === postid) {
                setNewPost(item.title);
                setNewPostContent(item.content);
                setEditch(true);
                setEditid(item.id);
                // setState({
                //     newPost: item.title,
                //     newPostContent: item.content,
                //     editch: true,
                //     editid: postid,
                // });
                return;
            }
        });
    };
    var handleUpdate = () => {
        var postsList = posts;
        var newpostsList = postsList.map((item, index) => {
            if (item.id === editid) {
                item.title = newTitle;
                item.content = newPostContent;
                return item;
            }
            return item;
        });
        setPosts(newpostsList);
        setEditch(false);
        // setState({
        //     posts: posts,
        //     editch: false,
        // });
    };
    var delPost = (postid) => {
        let postsList = posts;
        var newpostsList = postsList.filter((item, index) => {
            if (item.id === postid) {
                return false;
            }
            return true;
        });
        setPosts(newpostsList);
        // setState({
        //     posts: posts,
        // });
    };
    return (
        <div>
            <div>
                <div className='border m-2 p-2'>
                    Posts
                    <input
                        type='text'
                        placeholder='Enter Post title'
                        value={newTitle}
                        onChange={handleChange}
                    />
                    {!editch && (
                        <button
                            style={{ marginLeft: '10px' }}
                            className='btn btn-secondary'
                            type='button'
                            onClick={handleSubmit}>
                            Add Post
                        </button>
                    )}
                    {editch && (
                        <button
                            style={{ marginLeft: '10px' }}
                            className='btn btn-secondary'
                            type='button'
                            onClick={handleUpdate}>
                            Update
                        </button>
                    )}
                    <br />
                    Content :
                    <br />
                    <textarea
                        value={newPostContent}
                        onChange={handleContentChange}
                    />
                </div>
                <ul>
                    {posts.map((post, index) => (
                        <div key={post.id}>
                            {/* <li>{post.title}</li> */}
                            <div className='border m-1 p-1'>
                                <FunPost
                                    post={post}
                                    addComment={addComment}
                                    editPost={editPost}
                                    delPost={delPost}
                                    incLike={incLike}
                                    dicLike={dicLike}
                                />
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FunPosts;
