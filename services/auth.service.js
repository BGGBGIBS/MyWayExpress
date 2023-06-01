const argon2 = require('argon2');
const  userDTO  = require('../dto/user.dto');
const db = require('../models');

//Deux façon de faire : Un service user + un service Auth (Authentication) et les deux controllers associés
//Ou un seul service userService et deux controllers auth + user
const authService = {
    register : async (userToAdd) => {

        const transaction = await db.sequelize.transaction()

        let user;
        try {
            // console.log("USER TO ADD : ", userToAdd);

            const hashPwd = await argon2.hash(userToAdd.user_password);

            // console.log(hashPwd);
            userToAdd.user_password = hashPwd;

            user = await db.user.create(userToAdd, { transaction });
            await transaction.commit();

            // console.log("USER ID", user.user_id);
            const addeduser = await db.user.findByPk(user.user_id);
            // console.log("ADDED", addeduser);
            return addeduser ? new userDTO(addeduser) : null;
            
        }
        catch (err) {
            console.log(err);
            await transaction.rollback();
            return null;
        }

    },

    login : async (user_email, localuser_password) => {
        // console.log("EMAIL", user_email);
        // console.log("PASSWORD", localuser_password);
        const user = await db.user.findOne(
            {
            where : { user_email }
        }
        );
        // console.log("user FINDED",user);
        if(!user) {
            return null;
        }
        // console.log("user PASSWORD", user.user_password);
        // console.log("LOCAL PASSWORD", localuser_password);

        
        const isValid = await argon2.verify(user.user_password, localuser_password);
        // console.log("ARGON2 ", isValid);
        if(!isValid) {
            return null;
        }
        // console.log("TO RETURN ", user);
        return new userDTO(user);

    },
}

module.exports = authService;