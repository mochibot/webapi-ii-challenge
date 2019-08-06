import React from 'react';

const Comment = (props) => {
  return (
    <div>
      <div>{props.comment.text}</div>
    </div>
  )
}

export default Comment;