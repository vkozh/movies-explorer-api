const router = require('express').Router();
const { createUser, signin, signout } = require('../controllers/users');
const { validateUserDataSignup, validateUserDataSignin } = require('../middlewares/validate');
const checkAuth = require('../middlewares/auth');
const { notFoundError } = require('../middlewares/errors');

router.post('/signup', validateUserDataSignup, createUser);
router.post('/signin', validateUserDataSignin, signin);
router.use('/users', checkAuth, require('./users'));
router.use('/movies', checkAuth, require('./movies'));

router.post('/signout', signout);
router.use('*');
router.use(notFoundError);

module.exports = router;
