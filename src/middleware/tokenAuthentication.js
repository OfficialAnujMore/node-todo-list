import { ApiErrorHandler } from "../utils/ApiErrorHandler.js";
import { validateAccessToken } from "../utils/common.js";
import pkg from "jsonwebtoken";
const { JsonWebTokenError } = pkg;
const tokenAuthentication = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (token == null) {
      return res
        .status(401)
        .json(new ApiErrorHandler(401, [], `Unauthorized access`));
    }

    const decoded = await validateAccessToken(token);
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return res
        .status(401)
        .json(new ApiErrorHandler(401, [], `Invalid token`));
    }
    return res
      .status(401)
      .json(new ApiErrorHandler(401, [], `Unauthorized access`));
  }
};

export { tokenAuthentication };
