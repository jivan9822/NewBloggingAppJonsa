const router = require('express').Router();
const user = require('../controller/User');
const auth = require('../Middleware/authorization');

router.post('/signup', user.userSignUp);

router.post('/login', auth.authenticate, user.userLogin);
router.get('/isValid', auth.protect, user.isValid);
router.get('/logout', user.logOutHandler);
router.post('/addBlog', auth.protect, user.addBlog);
router.post('/editBlog', auth.protect, user.updateBlog);
router.post('/deleteBlog', auth.protect, user.deleteBlog);
router.get('/getblogs', auth.protect, user.getAllBlogs);

module.exports = router;
