/* eslint-disable react/prop-types */
// Posts.js
import Post from './Post';
import 'bootstrap/dist/css/bootstrap.min.css';

// eslint-disable-next-line react/prop-types
const Posts = ({ posts }) => {

  if(!posts){
    posts=[];
  }
  return (
    <div className="row justify-content-center">
      {posts.map(post => (
        <div className="col-md-8" key={post._id}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
