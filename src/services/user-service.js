const { StatusCodes } = require('http-status-codes');
const { UserRepository } = require('../repositiries');
const AppError = require('../utils/errors/app-error');
const {Auth}=require('../utils/common')
const bcrypt= require('bcrypt')

const userRepo = new UserRepository();

async function create(data) {
    try {
        const user = await userRepo.create(data);
        return user;
    } catch(error) {
        console.log(error.name);
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new user object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function signin(data) {
    try {
        const user = await userRepo.getUserByEmail(data.email);
        if (!user) {
            throw new AppError('No user found for the given email', StatusCodes.NOT_FOUND)
        }
        const passwordMatch = Auth.checkPassword(data.password, user.password);
        if (!passwordMatch) {
            throw new AppError('No user found for the given email', StatusCodes.NOT_FOUND);
         }

    } catch (error) {
        throw error;
    }
}

async function checkPassword(plainPassword, encryptedPassword) {
    try {
        return bcrypt.compare(plainPassword, encryptedPassword)
    } catch (error) {
        console.log(error);

        throw error;
    }
}

async function createToken(){}

module.exports = {
    create,
    createToken
}