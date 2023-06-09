const router = require('express').Router();

const userRouter = require('./user.router');
const recordRouter = require('./record.router');
const eventRouter = require('./event.router');
const occupationRouter = require('./occupation.router');
const institutionRouter = require('./institution.router');
const scaleRouter = require('./scale.router');
const gradeRouter = require('./grade.router');
const skillRouter = require('./skill.router');
const authRouter = require('./auth.router');
const auth0Router = require('./auth0.router');
const aresRouter = require('./ares.router');


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