var pagination = require('../middlewares/pagination.middleware');
const paypalController = require('../controllers/paypal.controller');
var paypalRouter = require('express').Router();


paypalRouter.route('/token')
    .post(paypalController.postToken)
paypalRouter.route('/orders')
    .post(paypalController.postOrders)
paypalRouter.route('/orders/:orderID/capture')
    .post(paypalController.postOrdersID)

module.exports = paypalRouter;

