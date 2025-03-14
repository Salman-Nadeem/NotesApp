// public/Routes/Route.js
const express = require('express');
const router = express.Router();
// Import the getUser function from the controller
const {  register ,login} = require('../controller/UserController');  

// Example route
router.route('/').post(register);
router.route('/Login').post(login);






// Export the router
module.exports = router;
