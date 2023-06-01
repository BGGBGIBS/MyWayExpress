var gradeController = require('../controllers/grade.controller');
var pagination = require('../middlewares/pagination.middleware');

var gradeRouter = require('express').Router();

gradeRouter.route('/')
    .get(pagination( { defaultLimit : 30, maxLimit : 200 }),gradeController.getAll)
    .post(gradeController.create)


gradeRouter.route('/:id')
    .get(gradeController.getById)
    // .put(gradeController.update)
    // .delete(gradeController.delete)

module.exports = gradeRouter;