const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const postRoutes = require('./postRoutes');
const router = require('express').Router();

router.use('/user', userRoutes)
router.use('/post', postRoutes)
router.use('/comment', commentRoutes)

module.exports = router