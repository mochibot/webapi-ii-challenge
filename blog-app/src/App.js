import React from 'react';
import { Route } from 'react-router-dom';

import BlogPage from './pages/BlogPage';
import PostPage from './pages/PostPage';

import 'antd/dist/antd.css';
import './App.css';

const App = () => {

  return (
    <div className="App">
      <header className="App-header">
        Blog app
      </header>
      <Route
        exact path='/' 
        component={BlogPage} />
      <Route 
        path='/posts/:postId' 
        component={PostPage} />
    </div>
  );
}

export default App;