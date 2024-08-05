import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded JWT:', decoded);  // Add logging

      req.user = await User.findById(decoded.userId).select('-password');

      console.log("user:",req.user)

      if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }


      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});


// Middleware to check if user is an admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

export { protect, isAdmin };