import express from 'express';
import { getCategories, createCategory } from '../controllers/categoryController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCategories); // Public
router.post('/create', protect, isAdmin, createCategory); // Admin only

export default router;
