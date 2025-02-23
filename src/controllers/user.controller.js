import { asyncHandler } from "../utils/asynchandler.js";
import apiErr from "../utils/apiError.js";
import User from "../models/user.model.js";
import uploadCloudinary from "../utils/cloudinary.js";
import apiResponse from "../utils/apiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password, fullName } = req.body;
  console.log(password);

  if (!userName || !email || !password || !fullName || !req.files.avatar) {
    throw new apiErr(400, "all fields are required");
  }
  console.log(req.files);
  let userExists = await User.findOne({ $or: [{ userName }, { email }] });
  if (userExists) {
    throw new apiErr(400, "user already exists");
  }
  const avatarLocalPath = req.files.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
  // if (!avatarLocalPath || !coverImageLocalPath) {
  //   throw new apiErr(400, "avatar and cover image are required");
  // }
  let avatar = await uploadCloudinary(avatarLocalPath, "avatar");
  let coverImage = await uploadCloudinary(coverImageLocalPath, "coverImage");
  console.log(avatar, "pp");

  let user = await User.create({
    userName: userName.toLowerCase(),
    email,
    password,
    fullName,
    avatar: avatar.url || "",
    coverImage: coverImage?.url || "",
  });
  const isUserCreated = await User.findById(user._id).select(
    "-password -refreshToken",
  );
  console.log(isUserCreated, "llll");

  if (!isUserCreated) {
    throw new apiErr(500, "user not created");
  }
  res.status(201).json(new apiResponse(201, "user registered", isUserCreated));
});
const generateAcessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new apiErr(400, "user not found");
    }
    const refreshToken = await user.generateRefreshToken();
    await user.save({ validateBeforeSave: false });
    const accessToken = user.generateAcessToken();
    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiErr(500, error.message);
  }
};
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new apiErr(400, "all fields are required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new apiErr(400, "user not found");
  }
  const isPasswordMatched = await User.isPasswordMatched(password);
  if (!isPasswordMatched) {
    throw new apiErr(400, "password not matched");
  }
  const { accessToken, refreshToken } = await generateAcessAndRefreshToken(
    user._id,
  );
  let options = {
    httpOnly: true, //cant be acessed by js using document.cookie
    sameSite: "none", //only works on https
    secure: true, //only works on https if http then it will not work
  };
  res
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(new apiResponse(200, "user logged in", {refreshToken,user, accessToken}));
}); 


const logoutUser = asyncHandler(
  async (req, res) => {
    res.clearCookie("refreshToken").clearCookie("accessToken").json(new apiResponse(200, "user logged out"));
  }
)

export { registerUser };

const name = (req, res) => {
  console.log("maryam is a good girls");
};
