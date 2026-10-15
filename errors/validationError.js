class ValidationError extends Error {
  constructor(message, errors = []) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
    this.errors = errors; // Array of validation errors from express-validator
  }
}

export default ValidationError;
