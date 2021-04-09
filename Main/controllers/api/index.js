const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const postRoutes = require('./postRoutes');
const router = require('express').Router();

router.use('/users', userRoutes)
router.use('/posts', postRoutes)
router.use('/comments', commentRoutes)

module.exports = router