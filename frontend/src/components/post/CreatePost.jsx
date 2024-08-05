// CreatePost.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreatePost = ({ onPostCreated }) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/category');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('category', category);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onPostCreated(response.data);
      setTitle('');
      setBody('');
      setImage(null);A
      setCategory('');
      setError('');
      setFormVisible(false); // Hide form after submission
    } catch (err) {
      console.error('Error creating post', err);
      setError('Failed to create post. Please try again.');
    }
  };

  return (
    <div className="mb-4">
      {!isFormVisible ? (
        <button className="btn btn-primary" onClick={() => setFormVisible(true)}>
          Add Post
        </button>
      ) : (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Create a New Post</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="body" className="form-label">Body</label>
                <textarea
                  className="form-control"
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows="5"
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select
                  className="form-control"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">Upload Image</label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  onChange={handleImageChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => setFormVisible(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
