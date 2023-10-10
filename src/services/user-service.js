// const { UserRepository } = require('../repositiries');

// const AppError=require('../utils/errors/app-error')
// const {StatusCodes}=require('http-status-codes')
 
// const userRepo = new UserRepository();

// async function create(data) {
//     try {
        
//         const user = await userRepo.create(data);
//         return user; 

//     } catch (error) {
          
//         if (error.name == 'SequelizeValidationError') {
            
//             let explanation = [];
//             error.errors.forEach((err) => {
//                 explanation.push(err.message);
//             });
//             console.log(explanation);
//             throw new AppError(explanation, StatusCodes.BAD_REQUEST);
            
//       }
//          throw new AppError('cannot create a new  user object',StatusCodes.INTERNAL_SERVER_ERROR);
//     }
// }

// module.exports = {
//     create
// }



const { StatusCodes } = require('http-status-codes');
const { UserRepository } = require('../repositiries');
const AppError = require('../utils/errors/app-error');
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

module.exports = {
    create
}