var eventDTO = require('../dto/event.dto');

var db = require('../models');


var eventService = {
    getAll : async (offset, limit) => {

        const { rows, count } = await db.event.findAndCountAll({
            distinct : true,
            offset : offset,
            limit : limit,
        });
        return {
            events : rows.map(event => new eventDTO(event)),
            count
        } 
    },
    getById : async(id) => {
        console.log(id);
        const event = await db.event.findByPk(id); 
        console.log(event);
        return event ? new eventDTO(event) : null; 
    },
    create : async(toAdd) => {

        const transaction = await db.sequelize.transaction()

        let event;
        try {
            console.log(toAdd);
            event = await db.event.create(toAdd, { transaction });
            await transaction.commit();

            console.log(event.event_id);
            const addedevent = await db.event.findByPk(event.event_id);

            return addedevent ? new eventDTO(addedevent) : null;
        }
        catch (err) {
            console.log(err);
            await transaction.rollback();
            return null;
        }
    },
    update : async(id, toUpdate) => {
        const event = await db.event.findByPk(id);
        if (event) {
            await event.update(toUpdate);
            return event;
        }
        return null;
    },
    delete : async(id) => {
        const event = await db.event.findByPk(id);
        if (event) {
            await event.destroy();
            return event;
        }
        return null;
    }    
}

module.exports = eventService;