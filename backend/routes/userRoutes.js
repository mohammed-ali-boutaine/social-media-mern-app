import express from "express";


import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';



import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  findUser,
  getUsers,
  updateUserProfile,
} from "../controllers/userContoller.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

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



router.post("/login",   loginUser,); // Public
router.post("/register", protect, isAdmin, upload.single("picture") , registerUser); // Admin only
router.post("/logout", protect, logoutUser); // Authenticated users
router.get("/find/:userId",findUser);
router.get("/",getUsers);
router.get("/profile", protect, getUserProfile); // Authenticated users
router.put("/profile",protect,updateUserProfile)
export default router;
