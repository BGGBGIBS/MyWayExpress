var skillController = require('../controllers/skill.controller');
var pagination = require('../middlewares/pagination.middleware');

var skillRouter = require('express').Router();

skillRouter.route('/')
    .get(pagination( { defaultLimit : 30, maxLimit : 200 }),skillController.getAll)
    .post(skillController.create)


skillRouter.route('/:id')
    .get(skillController.getById)
    // .put(skillController.update)
    // .delete(skillController.delete)

module.exports = skillRouter;