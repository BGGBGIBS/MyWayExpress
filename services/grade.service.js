var gradeDTO = require('../dto/grade.dto');

var db = require('../models');


var gradeService = {
    getAll : async (offset, limit) => {

        const { rows, count } = await db.grade.findAndCountAll({
            distinct : true,
            offset : offset,
            limit : limit,
        });
        return {
            grades : rows.map(grade => new gradeDTO(grade)),
            count
        } 
    },
    getById : async(id) => {
        console.log(id);
        const grade = await db.grade.findByPk(id); 
        console.log(grade);
        return grade ? new gradeDTO(grade) : null; 
    },
    create : async(toAdd) => {

        const transaction = await db.sequelize.transaction()

        let grade;
        try {
            console.log(toAdd);
            grade = await db.grade.create(toAdd, { transaction });
            await transaction.commit();

            console.log(grade.grade_id);
            const addedgrade = await db.grade.findByPk(grade.grade_id);

            return addedgrade ? new gradeDTO(addedgrade) : null;
        }
        catch (err) {
            console.log(err);
            await transaction.rollback();
            return null;
        }
    },
    update : async(id, toUpdate) => {
        const grade = await db.grade.findByPk(id);
        if (grade) {
            await grade.update(toUpdate);
            return grade;
        }
        return null;
    },
    delete : async(id) => {
        const grade = await db.grade.findByPk(id);
        if (grade) {
            await grade.destroy();
            return grade;
        }
        return null;
    }    
}

module.exports = gradeService;