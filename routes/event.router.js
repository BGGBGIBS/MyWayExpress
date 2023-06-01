var eventController = require('../controllers/event.controller');
var pagination = require('../middlewares/pagination.middleware');

var eventRouter = require('express').Router();

eventRouter.route('/')
    .get(pagination( { defaultLimit : 30, maxLimit : 200 }),eventController.getAll)
    .post(eventController.create)


eventRouter.route('/:id')
    .get(eventController.getById)
    // .put(eventController.update)
    // .delete(eventController.delete)

module.exports = eventRouter;
