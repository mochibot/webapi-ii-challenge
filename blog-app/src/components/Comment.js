import React from 'react';
import { List } from 'antd';

const Comment = (props) => {
  return (
    <List.Item>{props.comment.text}</List.Item>
  )
}

export default Comment;