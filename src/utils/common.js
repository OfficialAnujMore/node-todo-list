import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const generateAccessToken = async (data) => {
  return jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_VALIDITY,
  });
};

export const generateRefreshToken = async (data) => {
  return jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
    expiresIn: process.env.REFRESH_TOKEN_VALIDITY,
  });
};

export const validateRefreshToken = async (refreshToken) => {
  return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_PRIVATE_KEY);
};
export const validateAccessToken = async (accessToken) => {
  return jwt.verify(accessToken, process.env.ACCESS_TOKEN_PRIVATE_KEY);
};
