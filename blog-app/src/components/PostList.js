import React from 'react';
import Post from './Post';

const PostList = (props) => {
  return (
    <div>
      {props.posts.map(item => <Post key={`post_id ${item.id}`} post={item} selectPost={props.selectPost} deletePost={props.deletePost}/>)}
    </div>
  )
}

export default PostList;