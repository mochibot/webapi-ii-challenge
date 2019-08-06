import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PostList from './components/PostList';
import PostForm from './components/PostForm';

import 'antd/dist/antd.css';
import './App.css';

const App = () => {
  const [posts, setPost] = useState([]);
  const [activePost, setActivePost] = useState(null);

  let baseURL = 'http://localhost:8000/api/posts';

  useEffect(() => {
    axios.get(baseURL)
      .then(response => {
        console.log('fetching posts success: ', response);
        setPost(response.data.sort((a, b) => b.id - a.id));
      })
      .catch(error => {
        console.log('fetching posts error: ', error);
      })
  }, [baseURL]);
  
  const addPost = (post) => {
    axios.post(baseURL, post)
      .then(response => {
        return axios.get(baseURL)
          .then(response => {
            console.log('fetching posts success: ', response);
            setPost(response.data.sort((a, b) => b.id - a.id));
          })
          .catch(error => {
            console.log('fetching posts error: ', error);
          })
      })
      .catch(error => {
        console.log('fetching posts error: ', error);
      })
  }

  const deletePost = (event, postId) => {
    event.preventDefault();
    axios.delete(baseURL + `/${postId}`)
      .then(response => {
        console.log('delete post success: ', response);
        return axios.get(baseURL)
          .then(response => {
            console.log('fetching posts success: ', response);
            setPost(response.data.sort((a, b) => b.id - a.id));
          })
          .catch(error => {
            console.log('fetching posts error: ', error);
          })
      })
      .catch(error => {
        console.log('delete post error: ', error);
      })
  }

  const editPost = (id, post) => {
    axios.put(baseURL + `/${id}`, post)
      .then(response => {
        console.log('edit post success: ', response);
        return axios.get(baseURL)
          .then(response => {
            console.log('fetching posts success: ', response);
            setPost(response.data.sort((a, b) => b.id - a.id));
          })
          .catch(error => {
            console.log('fetching posts error: ', error);
          })
      })
      .catch(error => {
        console.log('edit post error: ', error);
      })
  }

  const selectPost = (event, post) => {
    event.preventDefault();
    setActivePost(post)
  }

  return (
    <div className="App">
      <header className="App-header">
        Blog app
      </header>
      <PostForm addPost={addPost} editPost={editPost} activePost={activePost} />
      <PostList posts={posts} deletePost={deletePost} selectPost={selectPost} />
    </div>
  );
}

export default App;
