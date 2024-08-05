import { useState } from 'react';

import "./stylex.css"
const Comment = ({ text }) => {
    return (
      <div className="comment">
        <p>{text}</p>
      </div>
    );
  };

const Post = ({ title, content }) => {
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
  
    const handleLike = () => {
      setLikes(likes + 1);
    };
  
    const handleCommentChange = (e) => {
      setCommentText(e.target.value);
    };
  
    const handleCommentSubmit = (e) => {
      e.preventDefault();
      if (commentText.trim()) {
        setComments([...comments, commentText]);
        setCommentText('');
      }
    };
  
    return (
      <div className="post">
        <h2>{title}</h2>
        <p>{content}</p>
        <div>
          <button onClick={handleLike}>Like ({likes})</button>
        </div>
        <div>
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              value={commentText}
              onChange={handleCommentChange}
              placeholder="Add a comment"
            />
            <button type="submit">Comment</button>
          </form>
        </div>
        <div className="comments">
          {comments.map((comment, index) => (
            <Comment key={index} text={comment} />
          ))}
        </div>
      </div>
    );
  };



  const Posts = () =>{
    const posts = [
        { title: 'First Post', content: 'This is the content of the first post.' },
        { title: 'Second Post', content: 'This is the content of the second post.' },
      ];
    
      return (
        <div className="app">
          {posts.map((post, index) => (
            <Post key={index} title={post.title} content={post.content} />
          ))}
        </div>
      );
  }

export default Posts;