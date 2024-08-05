import express from 'express';

import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

import { 
  getPosts, 
  getPostByUser, 
  createPost, 
  updatePost, 
  deletePost, 
  addComment, 
  deleteComment, 
  likePost 
} from '../controllers/postContoller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();



// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* FILE STORAGE CONFIGURATION */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/assets'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });



router.route('/')
  .get( getPosts) // Get all posts (authenticated users)
  .post(protect,upload.single("picture") ,  createPost); // Create post with file upload (authenticated users)

router.route('/user/:userId')
  .get(protect, getPostByUser); // Get posts by user (authenticated users)

router.route('/:id/comments')
  .post(protect, addComment); // Add comment (authenticated users)

router.route('/:id/likes')
  .post(protect, likePost); // Like a post (authenticated users)

router.route('/:id')
  .put(protect, updatePost) // Update post (authenticated users)
  .delete(protect, deletePost); // Delete post (authenticated users)

router.route('/:id/comments/:commentId')
  .delete(protect, deleteComment); // Delete comment (authenticated users)

export default router;
