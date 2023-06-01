var occupationDTO = require('../dto/occupation.dto');

var db = require('../models');


var occupationService = {
    getAll : async (offset, limit) => {

        const { rows, count } = await db.occupation.findAndCountAll({
            distinct : true,
            offset : offset,
            limit : limit,
        });
        return {
            occupations : rows.map(occupation => new occupationDTO(occupation)),
            count
        } 
    },
    getById : async(id) => {
        console.log(id);
        const occupation = await db.occupation.findByPk(id); 
        console.log(occupation);
        return occupation ? new occupationDTO(occupation) : null; 
    },
    create : async(toAdd) => {

        const transaction = await db.sequelize.transaction()

        let occupation;
        try {
            console.log(toAdd);
            occupation = await db.occupation.create(toAdd, { transaction });
            await transaction.commit();

            console.log(occupation.occupation_id);
            const addedoccupation = await db.occupation.findByPk(occupation.occupation_id);

            return addedoccupation ? new occupationDTO(addedoccupation) : null;
        }
        catch (err) {
            console.log(err);
            await transaction.rollback();
            return null;
        }
    },
    update : async(id, toUpdate) => {
        const occupation = await db.occupation.findByPk(id);
        if (occupation) {
            await occupation.update(toUpdate);
            return occupation;
        }
        return null;
    },
    delete : async(id) => {
        const occupation = await db.occupation.findByPk(id);
        if (occupation) {
            await occupation.destroy();
            return occupation;
        }
        return null;
    }    
}

module.exports = occupationService;