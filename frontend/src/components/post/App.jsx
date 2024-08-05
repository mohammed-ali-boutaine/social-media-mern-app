// App.js
import  { useState, useEffect } from 'react';
import axios from 'axios';
import Posts from './Posts';
import CreatePost from './CreatePost';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="App">
      {/* <h1 className="text-center mt-4">Posts</h1> */}
      <div className="container mt-4">
        <CreatePost onPostCreated={handlePostCreated} />
        <Posts posts={posts} />
      </div>
    </div>
  );
};

export default App;
