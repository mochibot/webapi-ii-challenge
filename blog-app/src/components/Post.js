import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'antd';

const Post = (props) => {

  return (
    <Card title={props.post.title} style={{width: '80%', margin: '20px auto'}}>
      <div>{props.post.contents}</div>
      <div>Created on: {props.post['created_at']}</div>
      <Button onClick={(event) => props.selectPost(event, props.post)}>Edit</Button>
      <Button onClick={(event) => props.deletePost(event, props.post.id)}>Delete</Button>
      <Link to={`/posts/${props.post.id}`}>View comments</Link>
    </Card>
  )
}

export default Post;

