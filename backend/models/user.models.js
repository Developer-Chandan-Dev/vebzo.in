const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
    },
    googleId: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    imageUrl: {
      type: String,
    },
    imageUrlPublicId: {
      type: String,
    },
    bio: {
      type: String,
      default: "",
    },
    post: {
      type: String,
    },
    address: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    role: {
      type: String,
      enum: ["user", "manager", "admin"],
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
