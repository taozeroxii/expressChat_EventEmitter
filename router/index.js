const router = require('express').Router();
// const { authenticated,isInRoles } = require('../configs/security');

// router
router.use('/admin',require('./admin'));

module.exports = router;
