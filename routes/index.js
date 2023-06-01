var router = require('express').Router();

var userRouter = require('./user.router');
var recordRouter = require('./record.router');
var eventRouter = require('./event.router');
var occupationRouter = require('./occupation.router');
var institutionRouter = require('./institution.router');
var scaleRouter = require('./scale.router');
var gradeRouter = require('./grade.router');
var skillRouter = require('./skill.router');
var authRouter = require('./auth.router');
var auth0Router = require('./auth0.router');
var aresRouter = require('./ares.router');


router.use('/record', recordRouter);
router.use('/institution', institutionRouter);
router.use('/occupation', occupationRouter);
router.use('/event', eventRouter);
router.use('/scale', scaleRouter);
router.use('/user', userRouter);
router.use('/grade', gradeRouter);
router.use('/skill', skillRouter);
router.use('/auth', authRouter);
router.use('/auth0', auth0Router);
router.use('/ares', aresRouter);


module.exports = router;