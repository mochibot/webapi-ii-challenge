import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, List } from 'antd';
import Comment from '../components/Comment';
import CommentForm from '../components/CommentForm';

const PostPage = (props) => {
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('')
  
  let baseURL = 'http://localhost:8000/api/posts';
  let id = props.match.params.postId;

  useEffect(() => {
    axios.get(`${baseURL}/${id}`)
      .then(response => {
        console.log('fetching post success: ', response);
        setPost(response.data);
      })
      .catch(error => {
        console.log('fetching post error: ', error);
        setError(`No post was fount with id of ${id}`)
      })
  }, [id, baseURL]);

  useEffect(() => {
    axios.get(`${baseURL}/${id}/comments`)
      .then(response => {
        console.log('fetching comments success: ', response);
        setComments(response.data)
      })
      .catch(error => {
        console.log('fetching comments error: ', error);
      })
  }, [id, baseURL]);

  const addComment = (comment) => {
    axios.post(`${baseURL}/${id}/comments`, comment)
      .then(response => {
        console.log('adding comments success: ', response);
        return axios.get(`${baseURL}/${id}/comments`)
          .then(response => {
            console.log('fetching comments success: ', response);
            setComments(response.data)
          })
          .catch(error => {
            console.log('fetching comments error: ', error);
          })
      })
      .catch(error => {
        console.log('fetching comments error: ', error);
      })
  }

  return (
    <div>
      <Link to='/'>Back to blog</Link>
      {error ? <div>{error}</div> : 
        (<Card title={post.title} style={{width: '80%', margin: '20px auto'}}>
          <div>{post.contents}</div>
          <div>Created on: {post['created_at']}</div>
          <Card type='inner'>
            <CommentForm addComment={addComment}/>
            <List>
              {comments.map(item => <Comment key={`comment ${item.id}`} comment={item}/>)}
            </List>
          </Card>
        </Card>)}
    </div>
  )
}

export default PostPage;