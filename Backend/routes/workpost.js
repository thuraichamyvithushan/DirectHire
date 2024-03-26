const express = require('express');

const router = express.Router()

module.exports = router;

const workcontroller = require('../controllers/workcontroller')

const upload = require ('../utiliti/multer')




//post

router.post('/work',upload.single('image'),workcontroller.workpost)


//update

router.patch('/work/:id',workcontroller.workupdate)


//delete

router.delete('/work/:id',workcontroller.workdelete )

//getAll

router.get('/work', workcontroller.workgetall)

router.get('/wadmin', workcontroller.workgetallAdmin)