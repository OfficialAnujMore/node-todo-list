import { User } from "../models/user.model.js";
import { ApiErrorHandler } from "../utils/ApiErrorHandler.js";
import { ApiResponseHandler } from "../utils/ApiResponseHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  generateAccessToken,
  generateRefreshToken,
  validateRefreshToken,
} from "../utils/common.js";
import bcrypt from "bcrypt";

const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;

  if (
    [firstname, lastname, username, email, password].some(
      (field) => field.trim() == ""
    )
  ) {
    return res
      .status(400)
      .json(new ApiResponseHandler(400, [], `All fields are required`));
  }
  // Check if user with the same email or username all ready existing
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    return res
      .status(401)
      .json(
        new ApiResponseHandler(
          401,
          [],
          `User with the email or username already exists`
        )
      );
  }

  const accessToken = await generateAccessToken({
    firstname,
    lastname,
    username,
    email,
  });
  const refreshToken = await generateRefreshToken({
    firstname,
    lastname,
    username,
    email,
  });
  const userRes = await User.create({
    firstname,
    lastname,
    username: username.toLowerCase(),
    email,
    password,
    refreshToken,
  });
  const createdUser = await User.findById(userRes._id).select("-password");

  if (!createdUser) {
    return res.status(500).json(500, [], `Failed to register user`);
  }
  return res
    .status(201)
    .json(
      new ApiResponseHandler(200, createdUser, "User registered successfully")
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;

  const userData = await User.findOne({
    $and: [{ email }, { username }],
  });
  if (!userData) {
    return res
      .status(401)
      .json(
        new ApiErrorHandler(
          401,
          [],
          `Invalid email ${email} or username ${username}`
        )
      );
  }

  const isValidPassword = await bcrypt.compare(password, userData.password);
  if (!isValidPassword) {
    return res
      .status(401)
      .json(new ApiErrorHandler(401, [], `Invalid password`));
  }

  const accessToken = await generateAccessToken({
    firstname,
    lastname,
    username,
    email,
  });
  const refreshToken = await generateRefreshToken({
    firstname,
    lastname,
    username,
    email,
  });
  return res
    .status(200)
    .json(
      new ApiResponseHandler(
        200,
        { firstname, lastname, username, email, accessToken, refreshToken },
        `Login successful`
      )
    );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  // console.log(req.bod);
  const token = req.body.refreshToken;
  if (!token) {
    return res
      .status(401)
      .json(new ApiErrorHandler(401, [], `Token not found`));
  }
  const isValidRefreshToken = await validateRefreshToken(token);

  if (!isValidRefreshToken) {
    return res.status(401).json(new ApiErrorHandler(401, [], `Invalid token`));
  }
  const userData = await User.findOne({ _id: req.body.id });
  const accessToken = await generateAccessToken({
    firstname: userData.firstname,
    lastname: userData.lastname,
    username: userData.username,
    email: userData.email,
  });

  return res.json(
    new ApiResponseHandler(
      200,
      { id: userData._id, accessToken },
      `Refresh token generated successfully`
    )
  );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.body.id, { refreshToken: "" });
  return res
    .status(200)
    .json(new ApiResponseHandler(200, [], `User logged out successful`));
});

// For development use only
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (users == null) {
    return res
      .status(404)
      .json(new ApiErrorHandler(404, [], "Failed to fetch user list"));
  } else {
    return res
      .status(201)
      .json(
        new ApiResponseHandler(200, users, "Successfully fetched user list")
      );
  }
});

export { getAllUsers, registerUser, loginUser, refreshAccessToken, logoutUser };
