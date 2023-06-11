var userDTO = require('../dto/user.dto');

var db = require('../models');


var userService = {
    getAll : async (offset, limit) => {

        const { rows, count } = await db.user.findAndCountAll({
            distinct : true,
            offset : offset,
            limit : limit,
        });
        return {
            users : rows.map(user => new userDTO(user)),
            count
        } 
    },
    getById : async(id) => {
        const user = await db.user.findByPk(id); 
        return user ? new userDTO(user) : null; 
    },
    create : async(toAdd) => {

        const transaction = await db.sequelize.transaction()

        let user;
        try {
            toAdd.user_role ? toAdd.user_role : "user";
            user = await db.user.create(toAdd, { transaction });
            await transaction.commit();

            const addeduser = await db.user.findByPk(user.user_id);

            return addeduser ? new userDTO(addeduser) : null;
        }
        catch (err) {
            console.error(err);
            await transaction.rollback();
            return null;
        }
    },
    update : async(id, toUpdate) => {
        const user = await db.user.findByPk(id);
        if (user) {
            await user.update(toUpdate);
            return user;
        }
        return null;
    },
    deleteById : async(id) => {
        const user = await db.user.findByPk(id);
        if (user) {
            await user.destroy();
            return user;
        }
        return null;
    }    
}

module.exports = userService;