const AppError = require("../utils/appError");

exports.responseError = (err, req, res, next) => {
    err.errorCode = err.errorCode || undefined;
    err.statusCode = err.statusCode;
    err.path = req.originalUrl;

    res.status(err.statusCode).json({
        service: 'psh',
        path: err.path,
        code: err.errorCode,
        message: err.message,
    });
};

exports.notFoundError = (req, res, next) => {
    let message = 'آدرس وارد شده صحیح نمی‌باشد';
    next(new AppError(message, '2000', 404));
}
