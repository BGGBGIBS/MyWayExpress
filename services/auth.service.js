const argon2 = require('argon2');
const  userDTO  = require('../dto/user.dto');
const db = require('../models');

const authService = {
    register : async (userToAdd) => {

        const transaction = await db.sequelize.transaction()

        let user;
        try {

            const hashPwd = await argon2.hash(userToAdd.user_password);

            userToAdd.user_password = hashPwd;

            user = await db.user.create(userToAdd, { transaction });
            await transaction.commit();

            const addeduser = await db.user.findByPk(user.user_id);
            return addeduser ? new userDTO(addeduser) : null;
            
        }
        catch (err) {
            console.log(err);
            await transaction.rollback();
            return null;
        }

    },

    login : async (user_email, localuser_password) => {
        const user = await db.user.findOne(
            {
            where : { user_email }
        }
        );
        if(!user) {
            return null;
        }

        const isValid = await argon2.verify(user.user_password, localuser_password);
        if(!isValid) {
            return null;
        }
        return new userDTO(user);

    },
}

module.exports = authService;