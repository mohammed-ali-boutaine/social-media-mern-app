import asyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.js';

// @desc Get all categories
// @route GET /api/// @route POST /api/category
// @access Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});


// @desc Create a new category
// @route POST /api/category
// @access Admin
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const categoryExists = await Category.findOne({ name });

  if (categoryExists) {
    res.status(400);
    throw new Error('Category already exists');
  }

  const category = await Category.create({ name });

  if (category) {
    res.status(201).json({ _id: category._id, name: category.name });
  } else {
    res.status(400);
    throw new Error('Invalid category data');
  }
});

export { getCategories, createCategory };
