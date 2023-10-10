const CrudRepository = require('./crud-repository');

const {User} = require('../models')


class UserRepository extends CrudRepository{
    constructor() {
        super(User);
    }
 async getUserByEmail(email) {
       const user = await User.findOne({
           where: {
                email:emal,
            }
       });
       return user;
    }

}

module.exports = UserRepository;