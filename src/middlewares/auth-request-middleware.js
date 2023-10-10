const { StatusCodes } = require('http-status-codes');
const { Errorresponse } = require('../utils/common')
const AppError = require('../utils/errors/app-error')
const { UserService } = require('../services');



async function checkAuth(req, res, next) {
    try {
        const response = await UserService.isAuthenticated(req.headers['x-access-token']);
        if(response) {
            req.user = response;
            next();
        }
    } catch(error) {
        return res
                .status(error.statusCode)
                .json(error);
    }

}

function validateAuthRequest(req, res, next) {
    if (!req.body.email) {
        Errorresponse.message = 'Something went wrong while authenticating user';
        Errorresponse.error = new AppError(['Email not fount in the oncoming request'], StatusCodes.BAD_REQUEST)
    

    return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if (!req.body.password) {
        ErrorResponse.message = 'Something went wrong while authenticating user';
        ErrorResponse.error = new AppError(['password not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();

}
module.exports = {
    validateAuthRequest,
    checkAuth
}