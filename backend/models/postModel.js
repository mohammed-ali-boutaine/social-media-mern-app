import mongoose from "mongoose";

// Comment schema
const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Post schema
const postSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    body:{type: String},
    picturePath: { type: String, default: "user-with-no-image.webp" },
    comments: [commentSchema],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    category:String
  },
  {
    timestamps: true,
  }
);

// Set a default category value if necessary
postSchema.pre('save', async function (next) {
  if (!this.category) {
    const generalCategory = await mongoose.model('Category').findOne({ name: 'general' });
    if (generalCategory) {
      this.category = generalCategory._id;
    }
  }
  next();
});

const Post = mongoose.model("Post", postSchema);

export default Post;
