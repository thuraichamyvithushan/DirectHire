const express = require('express');

const router = express.Router()

module.exports = router;

const labourcontroller = require('../controllers/labourcontroller')

const upload = require ('../utiliti/multer')







//post

router.post('/labour',upload.single('image'),labourcontroller.labourpost)


//update

router.patch('/labour/:id',labourcontroller.labourupdate)


//delete

router.delete('/labour/:id',labourcontroller.labourdelete)


// Get by ID Method

router.get('/labour/:id',labourcontroller.labourgetbyid)

//Get All

router.get('/labour', labourcontroller.labourgetall)

router.get('/ladmin', labourcontroller.labourgetallAdmin)