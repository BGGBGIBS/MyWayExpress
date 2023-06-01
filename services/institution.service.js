var institutionDTO = require('../dto/institution.dto');

var db = require('../models');


var institutionService = {
    getAll : async (offset, limit) => {

        const { rows, count } = await db.institution.findAndCountAll({
            distinct : true,
            offset : offset,
            limit : limit,
        });
        return {
            institutions : rows.map(institution => new institutionDTO(institution)),
            count
        } 
    },
    getById : async(id) => {
        console.log(id);
        const institution = await db.institution.findByPk(id); 
        console.log(institution);
        return institution ? new institutionDTO(institution) : null; 
    },
    create : async(toAdd) => {

        const transaction = await db.sequelize.transaction()

        let institution;
        try {
            console.log(toAdd);
            institution = await db.institution.create(toAdd, { transaction });
            await transaction.commit();

            console.log(institution.institution_id);
            const addedinstitution = await db.institution.findByPk(institution.institution_id);

            return addedinstitution ? new institutionDTO(addedinstitution) : null;
        }
        catch (err) {
            console.log(err);
            await transaction.rollback();
            return null;
        }
    },
    update : async(id, toUpdate) => {
        const institution = await db.institution.findByPk(id);
        if (institution) {
            await institution.update(toUpdate);
            return institution;
        }
        return null;
    },
    delete : async(id) => {
        const institution = await db.institution.findByPk(id);
        if (institution) {
            await institution.destroy();
            return institution;
        }
        return null;
    }    
}

module.exports = institutionService;