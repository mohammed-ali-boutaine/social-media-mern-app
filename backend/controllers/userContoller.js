import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const loginUser = asyncHandler(async (req, res, next) => {

//   {
//     "email":"admin@gmail.com",
//     "password":"admin"
// }
  let { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
      res.status(400); // Bad Request
      return next(new Error('Please provide both email and password'));
    }
    
  const user = await User.findOne({ email });

  // Check if user exists
  if (!user) {
    res.status(401);
    return next(new Error("User not found")); 
  }

  if (user && (await user.matchPassword(password))) {

    generateToken(res, user._id);

    req.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role : user.role
    };

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role : user.role
    });
  } else {
    res.status(401); 
    return next(new Error("Invalid password")); 
  }
});

// @desc    Register a new user (Admin only)
// @route   POST /api/auth/register
// @access  Private (Admin only)
const registerUser = asyncHandler(async (req, res, next) => {

  console.log("register");


  const { name, email, password, picturePath, role } = req.body;
  if(!name || !email || !password) return res.status(400).json("All fields are required.");

  // if (req.user.role !== "admin") {
  //   res.status(403); 
  //   return next(new Error("Admins only can register users")); 
  // }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400); 
    return next(new Error("User already exists")); 
  }

  // Create a new user
  const user = await User.create({
    name,
    email,
    password,
    picturePath,
    role,
  });

  // If user creation is successful, respond with user details
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400); // Set status to Bad Request
    return next(new Error("Invalid user data")); // Pass error to error-handling middleware
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {

    httpOnly: true,
    expires: new Date(0), 
  });
  res.status(200).json({ message: "Logged out successfully" }); 
};

export default logoutUser;

//////////////////////////////////////////////////////////////






const findUser = async(req,res) =>{
  const userId = req.params.userId;
  try{
      const user = await User.findById(userId);

      res.status(200).json(user);

  }catch(error){
      console.log(error);
      res.status(500).json(error);
  }

}
const getUsers = async(req,res) =>{
 
  try{
      const users = await User.find();

      res.status(200).json(users);

  }catch(error){
      console.log(error);
      res.status(500).json(error);
  }

}




















// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res, next) => {

  const user = await User.findById(req.user._id).select("-password");

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      role: user.role,
      email: user.email,
    });
  } else {
    res.status(404); 
    return next(new Error("User not found")); 
  }
});


const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


export { loginUser, registerUser, logoutUser, getUserProfile ,updateUserProfile,findUser,getUsers};
