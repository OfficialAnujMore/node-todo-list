import { User } from "../models/user.model.js";
import { ApiResponseHandler } from "../utils/ApiResponseHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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
  //   Check if user with the same email or username all ready existing

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  console.log(existingUser);

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

  const userRes = await User.create({
    firstname,
    lastname,
    username: username.toLowerCase(),
    email,
    password,
  });
  const createdUser = await User.findById(userRes._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    return res.status(500).json(500, [], `Failed to register user`);
  }
  return res
    .status(201)
    .json(
      new ApiResponseHandler(200, createdUser, "User registered successfully")
    );
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

export { getAllUsers, registerUser };
