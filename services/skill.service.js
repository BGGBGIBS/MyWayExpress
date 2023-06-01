var skillDTO = require('../dto/skill.dto');

var db = require('../models');


var skillService = {
    getAll : async (offset, limit) => {

        const { rows, count } = await db.skill.findAndCountAll({
            distinct : true,
            offset : offset,
            limit : limit,
        });
        return {
            skills : rows.map(skill => new skillDTO(skill)),
            count
        } 
    },
    getById : async(id) => {
        console.log(id);
        const skill = await db.skill.findByPk(id); 
        console.log(skill);
        return skill ? new skillDTO(skill) : null; 
    },
    create : async(toAdd) => {

        const transaction = await db.sequelize.transaction()

        let skill;
        try {
            console.log(toAdd);
            skill = await db.skill.create(toAdd, { transaction });
            await transaction.commit();

            console.log(skill.skill_id);
            const addedskill = await db.skill.findByPk(skill.skill_id);

            return addedskill ? new skillDTO(addedskill) : null;
        }
        catch (err) {
            console.log(err);
            await transaction.rollback();
            return null;
        }
    },
    update : async(id, toUpdate) => {
        const skill = await db.skill.findByPk(id);
        if (skill) {
            await skill.update(toUpdate);
            return skill;
        }
        return null;
    },
    delete : async(id) => {
        const skill = await db.skill.findByPk(id);
        if (skill) {
            await skill.destroy();
            return skill;
        }
        return null;
    }    
}

module.exports = skillService;