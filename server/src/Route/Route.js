const router = require('express').Router();
const user = require('../controller/User');
const blog = require('../controller/Blog');
const auth = require('../Middleware/authorization');

// USER ROUTES
router.post('/signup', user.userSignUp);
router.post('/login', auth.authenticate, user.userLogin);
router.get('/isValid', auth.protect, user.isValidUser);
router.get('/logout', user.logOutHandler);

// BLOG ROUTES
router.post('/addBlog', auth.protect, blog.addBlog);
router.post('/editBlog', auth.protect, blog.updateBlog);
router.post('/deleteBlog', auth.protect, blog.deleteBlog);
router.post('/action', auth.protect, blog.recordAction);
router.get('/getblogs', auth.protect, blog.getAllBlogs);

module.exports = router;
