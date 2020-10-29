const express = require('express');
const router = express.Router();
const App1Controller = require('./controller.js')

// Get goals by Id
router.get('/', App1Controller.dummy);

module.exports = router;