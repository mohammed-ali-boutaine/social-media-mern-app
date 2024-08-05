// Post.js
import  { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Post = ({ post }) => {
  const [likes, setLikes] = useState(post.likes.length);
  const [comments, setComments] = useState(post.comments);
  const [commentText, setCommentText] = useState('');


  const handleLike = async () => {
    try {
      await axios.post(`/api/posts/${post._id}/like`);
      setLikes(likes + 1);
    } catch (error) {
      console.error('Error liking the post', error);
    }
  };



  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/posts/${post._id}/comments`, { text: commentText });
      setComments([...comments, response.data]);
      setCommentText('');
    } catch (error) {
      console.error('Error submitting comment', error);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        {post.picturePath && post.picturePath !== "user-with-no-image.webp" && (
          <img src={post.picturePath} alt="Post" className="card-img-top mb-3" />
        )}
        {post.body && <p className="card-text">{post.body}</p>}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <strong>Likes: </strong> {likes}
          </div>
          <button onClick={handleLike} className="btn btn-primary">Like</button>
        </div>
        <div className="comments">
          <h3>Comments</h3>
          {comments.map(comment => (
            <div key={comment._id} className="border p-2 mb-2">
              <p>{comment.text}</p>
              <small>{new Date(comment.date).toLocaleString()}</small>
            </div>
          ))}
          <form onSubmit={handleCommentSubmit}>
            <div className="mb-3">
              <textarea
                className="form-control"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows="3"
                placeholder="Add a comment"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-secondary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string,
    picturePath: PropTypes.string,
    likes: PropTypes.arrayOf(PropTypes.string),
    comments: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })),
  }).isRequired,
};

export default Post;
