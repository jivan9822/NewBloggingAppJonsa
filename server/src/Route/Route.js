const router = require('express').Router();
const user = require('../controller/User');
const auth = require('../Middleware/authorization');

router.post('/signup', user.userSignUp);

router.post('/login', auth.authenticate, user.userLogin);
router.get('/isValid', auth.isValidUser);
router.get('/logout', user.logOutHandler);

module.exports = router;
