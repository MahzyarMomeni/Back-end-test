class AppError extends Error {
    constructor(message, errorCode, statusCode) {
        super(message);
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
