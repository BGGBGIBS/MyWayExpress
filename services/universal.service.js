var db = require('../models');


var uniObjectService = {
    getAll : async (toDTO, toModel,offset, limit) => {

        const { rows, count } = await toModel.findAndCountAll({
            distinct : true,
            offset : offset,
            limit : limit,
        });
        return {
            uniObjects : rows.map(uniObject => new toDTO(uniObject)),
            count
        } 
    },
    getById : async(toDTO, toModel, id) => {
        console.log(id);
        const uniObject = await toModel.findByPk(id); 
        console.log(uniObject);
        return uniObject ? new toDTO(uniObject) : null; 
    },
    create : async(toDTO, toModel, toAdd) => {

        const transaction = await db.sequelize.transaction()

        let uniObject;
        try {
            console.log(toAdd);
            uniObject = await toModel.create(toAdd, { transaction });
            await transaction.commit();

            console.log(uniObject.uniObject_id);
            const addeduniObject = await toModel.findByPk(uniObject.uniObject_id);

            return addeduniObject ? new toDTO(addeduniObject) : null;
        }
        catch (err) {
            console.log(err);
            await transaction.rollback();
            return null;
        }
    },
    update : async(toDTO, toModel, id, toUpdate) => {
        const uniObject = await toModel.findByPk(id);
        if (uniObject) {
            await uniObject.update(toUpdate);
            return uniObject;
        }
        return null;
    },
    delete : async(id) => {
        const uniObject = await toModel.findByPk(id);
        if (uniObject) {
            await uniObject.destroy();
            return uniObject;
        }
        return null;
    }    
}

module.exports = uniObjectService;