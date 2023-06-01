var userController = require('../controllers/user.controller');
var pagination = require('../middlewares/pagination.middleware');

var userRouter = require('express').Router();

userRouter.route('/')
    .get(pagination( { defaultLimit : 30, maxLimit : 200 }),userController.getAll)
    .post(userController.create)


userRouter.route('/:id')
    .get(userController.getById)
    // .put(userController.update)
    .delete(userController.delete)

module.exports = userRouter;