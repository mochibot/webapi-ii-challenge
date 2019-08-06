import React, { useState, useEffect } from 'react';

const PostForm = (props) => {
  const [post, setPost] = useState({
    title: '',
    contents: ''
  });

  useEffect(() => {
    if (props.activePost) {
      setPost({
        title: props.activePost.title,
        contents: props.activePost.contents,
      })
    }
  }, [props.activePost])

  const [error, setError] = useState('')

  const inputPost = (event) => {
    setPost({
      ...post,
      [event.target.name]: event.target.value
    })
    setError('');
  }

  const submitPost = (event) => {
    event.preventDefault();
    if (!post.title || !post.contents) {
      setError('Title and contents cannot be left blank');
    } else {
      if (props.activePost) {
        props.editPost(props.activePost.id, post)
      } else {
        props.addPost(post);
      }
    }
    setPost({
      title: '',
      contents: ''
    })
  }

  return (
    <form onSubmit={submitPost}>
      <input name='title' value={post.title} onChange={inputPost}/>
      <input name='contents' value={post.contents} onChange={inputPost}/>
      {error && <div>{error}</div>}
      <button onClick={submitPost}>Submit</button>
    </form>
  )
}

export default PostForm;