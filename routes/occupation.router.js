var occupationController = require('../controllers/occupation.controller');
var pagination = require('../middlewares/pagination.middleware');

var occupationRouter = require('express').Router();

occupationRouter.route('/')
    .get(pagination( { defaultLimit : 30, maxLimit : 200 }),occupationController.getAll)
    .post(occupationController.create)


occupationRouter.route('/:id')
    .get(occupationController.getById)
    // .put(occupationController.update)
    // .delete(occupationController.delete)

module.exports = occupationRouter;