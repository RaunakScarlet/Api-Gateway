const bcrypt= require('bcrypt')
const jwt=require('jsonwebtoken')
async function checkPassword(plainPassword, encryptedPassword) {
    try {
        return bcrypt.compare(plainPassword, encryptedPassword)
    } catch (error) {
        console.log(error);

        throw error;
    }
}

async function createToken(input) {
    try {
        return jwt.sign(input, '', {expiresIn:})
    } catch (error) {
        
    }
}

module.exports = {
    create,
    createToken
}