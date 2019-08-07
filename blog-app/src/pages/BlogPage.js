import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'antd';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';


const BlogPage = () => {
  const [posts, setPost] = useState([]);
  const [activePost, setActivePost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            setIsModalOpen(false);
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
            setActivePost(null);
            setIsModalOpen(false);
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
    openModal(event);
  }

  const openModal = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  }

  const closeModal = (event) => {
    event.preventDefault();
    setIsModalOpen(false);
    setActivePost(null);
  }

  return (
    <div>
      <Modal visible={isModalOpen} footer={null} onCancel={closeModal}>
        <PostForm addPost={addPost} editPost={editPost} activePost={activePost} closeModal={closeModal}/>  
      </Modal>
      <Button onClick={openModal} icon='plus-circle'>Add post</Button>
      <PostList posts={posts} deletePost={deletePost} selectPost={selectPost}/>
    </div>
  );
}

export default BlogPage;