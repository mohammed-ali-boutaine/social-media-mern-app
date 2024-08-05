import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";

//##########################################################

// @desc Get all posts
// @route GET /api/posts
// @access Private
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({})
    .populate("user", "name email")
    .populate("category", "name")
    .sort({ createdAt: -1 });
  res.json(posts);
});

//##########################################################

// @desc Get post by user
// @route GET /api/posts/:user
// @access Private
const getPostByUser = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.params.userId })
    .populate("user", "name email")
    .populate("category", "name");

  return res.json(posts);
});

//##########################################################

// @desc Create a new post
// @route POST /api/posts/create
// @access Private
const createPost = asyncHandler(async (req, res) => {
  const { title, body, category } = req.body;
  const picturePath = req.file ? req.file.path : "user-with-no-image.webp";
  
//   {
//     "title":"test 2",
//     "body":"body 2",
//     "category":"UI/UX"
// }

  const post = new Post({
    user: req.user._id,
    title,
    body,
    picturePath,
    category,
  });

  const createdPost = await post.save();

  res.status(201).json(createdPost);
});

//##########################################################

// @desc Delete a post
// @route DELETE /api/posts/:id
// @access Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    if (post.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized to delete this post");
    }

    await post.deleteOne();
        res.status(200).json({ message: "Post removed" });
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

// @desc Update a post
// @route PUT /api/posts/:id
// @access Private
const updatePost = asyncHandler(async (req, res) => {
  const { title, body, picturePath, category } = req.body;
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (post.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to update this post");
  }

  post.title = title || post.title;
  post.body = body || post.body;
  post.picturePath = picturePath || post.picturePath;
  post.category = category || post.category;

  const updatedPost = await post.save();
  res.status(200).json(updatedPost);
});

// @desc Add a comment to a post
// @route POST /api/posts/:id/comments
// @access Private
const addComment = asyncHandler(async (req, res) => {
  const { text } = req.body;

  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const newComment = {
    user: req.user._id,
    text,
    date: new Date(),
  };

  post.comments.push(newComment);
  const updatedPost = await post.save();
  res.status(201).json(comment);
});

// @desc Delete a comment
// @route DELETE /api/posts/:id/comments/:commentId
// @access Private
const deleteComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const comment = post.comments.id(req.params.commentId);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  if (comment.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to delete this comment");
  }

  comment.remove();
  const updatedPost = await post.save();
  res.status(200).json(updatedPost);
});

// #################################333333

// @desc Like a post
// @route POST /api/posts/:id/likes
// @access Private
const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  if (!post.likes.includes(req.user._id)) {
    post.likes.push(req.user._id);
  } else {
    post.likes = post.likes.filter(
      (like) => like.toString() !== req.user._id.toString()
    );
  }

  const updatedPost = await post.save();

  res.status(201).json(updatedPost);
});

export {
  getPosts,
  getPostByUser,
  createPost,
  updatePost,
  deletePost,
  addComment,
  deleteComment,
  likePost,
};
