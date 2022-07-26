const router = require('express').Router();
const { getProfile, updateProfile } = require('../controllers/users');
const { validateUserDataUpdate } = require('../helpers/validate');

router.get('/me', getProfile);
router.patch('/me', validateUserDataUpdate, updateProfile);

module.exports = router;
