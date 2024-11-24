import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userShema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String, //cloudinary url
      required: true,
    },
    coverImage: {
      type: String, //cloudinary url
      required: true,
    },
    watchHistory: [{ type: Schema.Types.ObjectId, ref: "Video" }],
    password: {
      type: String,
      required: true,
      trim: [true, "Password is required"],
    },
  },
  {
    timestamps: true,
  },
);


userShema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  if( this.isModified("password") ) return next();
  this.password = await bcrypt.hash(this.password, salt); 
  next();
});

userShema.methods.isPasswordMatched = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userShema.methods.generateAcessToken = function () {
  const token = jwt.sign({ _id: this._id , userName: this.userName, email: this.email, fullName: this.fullName}, process.env.JWT_SECRET, {
    expiresIn: process.env.Acess_Token_Expiry,
  }); //we donr embed password in token due to security measure
  return token;
};

userShema.methods.generateRefreshToken = function () {
  const token = jwt.sign({ _id: this._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY ,
  }); //we donr embed password in token due to security measure
  return token;
};