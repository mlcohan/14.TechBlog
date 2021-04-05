const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const dashRoutes = require('./dashboardRoutes');
const apiRoutes = require('./api')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashRoutes)

module.exports = router;
