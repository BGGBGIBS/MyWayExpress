var scaleController = require('../controllers/scale.controller');
var pagination = require('../middlewares/pagination.middleware');

var scaleRouter = require('express').Router();

scaleRouter.route('/')
    .get(pagination( { defaultLimit : 30, maxLimit : 200 }),scaleController.getAll)
    .post(scaleController.create)


scaleRouter.route('/:id')
    .get(scaleController.getById)
    // .put(scaleController.update)
    // .delete(scaleController.delete)

module.exports = scaleRouter;