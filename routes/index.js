const router = require('express').Router();
const { createUser, signin, signout } = require('../controllers/users');
const { validateUserDataSignup, validateUserDataSignin } = require('../helpers/validate');
const checkAuth = require('../middlewares/auth');
const { notFoundError } = require('../middlewares/errors');

router.post('/signup', validateUserDataSignup, createUser);
router.post('/signin', validateUserDataSignin, signin);
router.post('/signout', signout);
router.use('/users', checkAuth, require('./users'));
router.use('/movies', checkAuth, require('./movies'));

router.use(notFoundError);

module.exports = router;
