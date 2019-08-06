import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'antd';
import Comment from './Comment';
import CommentForm from './CommentForm';

const Post = (props) => {
  const [comments, setComments] = useState([]);
  
  let baseURL = 'http://localhost:8000/api/posts';

  useEffect(() => {
    axios.get(`${baseURL}/${props.post.id}/comments`)
      .then(response => {
        console.log('fetching comments success: ', response);
        setComments(response.data)
      })
      .catch(error => {
        console.log('fetching comments error: ', error);
      })
  }, []);

  const addComment = (comment) => {
    axios.post(`${baseURL}/${props.post.id}/comments`, comment)
      .then(response => {
        console.log('adding comments success: ', response);
        return axios.get(`${baseURL}/${props.post.id}/comments`)
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
    <Card title={props.post.title}>
      <div>{props.post.contents}</div>
      <div>{props.post['created_at']}</div>
      <button onClick={(event) => props.selectPost(event, props.post)}>Edit</button>
      <button onClick={(event) => props.deletePost(event, props.post.id)}>Delete</button>
      <div>
        <CommentForm addComment={addComment}/>
        {comments.map(item => <Comment key={`comment ${item.id}`} comment={item}/>)}
      </div>
    </Card>
  )
}

export default Post;

