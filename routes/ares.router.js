var aresController = require('../controllers/ares.controller');
var pagination = require('../middlewares/pagination.middleware');

var aresRouter = require('express').Router();
var aresPasserellesRouter = require('./ares.passerelles.router');

aresRouter.route('/grade')
    .get(pagination( { defaultLimit : 100, maxLimit : 2500 }),aresController.getAllGrades)

aresRouter.use('/passerelle', aresPasserellesRouter);

aresRouter.route('/dataset')
    .get(pagination( { defaultLimit : 100, maxLimit : 2500 }), aresController.getAllDatasets)

aresRouter.route('/datasetid')
    .get(pagination({ defaultLimit : 100, maxLimit : 2500 }), aresController.getAllDatasetsID)

aresRouter.route('/domaine')
    .get(pagination( { defaultLimit: 100, maxLimit: 2500 }), aresController.getAllDomainesPaysage)

aresRouter.route('/institution')
    .get(pagination( { defaultLimit : 100, maxLimit : 2500 }), aresController.getAllInstitutions)


module.exports = aresRouter;