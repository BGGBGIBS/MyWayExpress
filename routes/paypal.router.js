var pagination = require('../middlewares/pagination.middleware');

var paypalRouter = require('express').Router();


paypalRouter.route('/token')
    .post(paypalController)
paypalRouter.route('/orders')
    .post(paypalController)
paypalRouter.route('/orders/:orderID/capture')
    .post(paypalController)

module.exports = paypalRouter;

