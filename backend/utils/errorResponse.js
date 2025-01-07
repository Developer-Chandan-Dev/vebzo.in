class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.success = false; // Add success field
  }
}

module.exports = ErrorResponse;
