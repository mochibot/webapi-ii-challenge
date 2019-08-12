import React, { useState } from 'react';
import { Form, Button } from 'antd';

const CommentForm = (props) => {
  const [comment, setComment] = useState({
    text: ''
  });
  const [error, setError] = useState('')

  const inputComment = (event) => {
    setComment({
      text: event.target.value
    })
    setError('');
  }

  const submitComment = (event) => {
    event.preventDefault();
    if (!comment.text) {
      setError('Commend cannot be left blank');
    } else {
      props.addComment(comment);
      setComment({
        text: ''
      })
    }
  }

  return (
    <Form onSubmit={submitComment}>
      <input name='text' value={comment.text} placeholder='Comment' onChange={inputComment}/>
      {error && <div>{error}</div>}
      <Button onClick={submitComment}>Submit</Button>
    </Form>
  )
}

export default CommentForm;