var recordController = require('../controllers/record.controller');
var pagination = require('../middlewares/pagination.middleware');

var recordRouter = require('express').Router();

recordRouter.route('/')
    .get(pagination( { defaultLimit : 30, maxLimit : 200 }),recordController.getAll)
    .post(recordController.create)
    .post(recordController.createAll)


recordRouter.route('/:id')
    .get(recordController.getById)
    // .put(recordController.update)
    // .delete(recordController.delete)

recordRouter.route('/user/:id')
    .get(recordController.getByUserId)

module.exports = recordRouter;