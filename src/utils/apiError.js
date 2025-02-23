class apiError extends Error {
  constructor(statusCode, message = "something went wrong", errors = [], stack) {
    super(message); // Call the constructor of the parent class (Error)
    this.statusCode = statusCode;
    this.errors = errors;
    if (!stack) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = stack;
    }
  }
  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      errors: this.errors,
      stack: this.stack, // Optional, for debugging only
    };
  }
}

export default apiError ;


// import apiError from './utils/apiError';

// function someFunction() {
//   try {
//     // Some code that might throw an error
//     throw new apiError(404, "Resource not found", ["Resource ID is invalid"]);
//   } catch (error) {
//     console.error("Asad",error.stack);
//     // Handle the error, e.g., send a response to the client
//   }
// }

// someFunction();