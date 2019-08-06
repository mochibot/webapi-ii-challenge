import React, { useState } from 'react';

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
    <form onSubmit={submitComment}>
      <input name='text' value={comment.text} onChange={inputComment}/>
      {error && <div>{error}</div>}
      <button onClick={submitComment}>Submit</button>
    </form>
  )
}

export default CommentForm;