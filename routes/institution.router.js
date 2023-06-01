var institutionController = require('../controllers/institution.controller');
var pagination = require('../middlewares/pagination.middleware');

var institutionRouter = require('express').Router();

institutionRouter.route('/')
    .get(pagination( { defaultLimit : 30, maxLimit : 200 }),institutionController.getAll)
    .post(institutionController.create)


institutionRouter.route('/:id')
    .get(institutionController.getById)
    // .put(institutionController.update)
    // .delete(institutionController.delete)

module.exports = institutionRouter;