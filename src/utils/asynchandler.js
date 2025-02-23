import e from "express";
import apiError from "./apiError.js";
const asyncHandler = (fn) => async (req, res, next) => {
 try {
    return await Promise.resolve(fn(req, res, next));
  } catch (err) {
   return res.status(500).json(new apiError(500, err.message, [], err.stack));
  }
};
export { asyncHandler };
