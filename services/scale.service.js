var scaleDTO = require('../dto/scale.dto');

var db = require('../models');


var scaleService = {
    getAll : async (offset, limit) => {

        const { rows, count } = await db.scale.findAndCountAll({
            distinct : true,
            offset : offset,
            limit : limit,
        });
        return {
            scales : rows.map(scale => new scaleDTO(scale)),
            count
        } 
    },
    getById : async(id) => {
        console.log(id);
        const scale = await db.scale.findByPk(id); 
        console.log(scale);
        return scale ? new scaleDTO(scale) : null; 
    },
    create : async(toAdd) => {

        const transaction = await db.sequelize.transaction()

        let scale;
        try {
            console.log(toAdd);
            scale = await db.scale.create(toAdd, { transaction });
            await transaction.commit();

            console.log(scale.scale_id);
            const addedscale = await db.scale.findByPk(scale.scale_id);

            return addedscale ? new scaleDTO(addedscale) : null;
        }
        catch (err) {
            console.log(err);
            await transaction.rollback();
            return null;
        }
    },
    update : async(id, toUpdate) => {
        const scale = await db.scale.findByPk(id);
        if (scale) {
            await scale.update(toUpdate);
            return scale;
        }
        return null;
    },
    delete : async(id) => {
        const scale = await db.scale.findByPk(id);
        if (scale) {
            await scale.destroy();
            return scale;
        }
        return null;
    }    
}

module.exports = scaleService;