var aresController = require('../controllers/ares.controller');
var pagination = require('../middlewares/pagination.middleware');

var aresPasserellesRouter = require('express').Router();

aresPasserellesRouter.route('/')
    .get(pagination( { defaultLimit : 100, maxLimit : 2500 }),aresController.getAllPasserelles)

aresPasserellesRouter.route('/:ba_id')
    .get(pagination( { defaultLimit : 100, maxLimit : 2500 }),aresController.getAllPasserellesForBac)

module.exports = aresPasserellesRouter;
