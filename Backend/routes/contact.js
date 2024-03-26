const express = require('express');

const router = express.Router()

module.exports = router;



const contactcontroller = require('../controllers/contactcontroller')


//post

router.post('/send',contactcontroller.contactpost)
