const express = require('express');
const router = express.Router();
//  const {protect}=require('../middlewares/authMiddleware')
const userController = require('../controllers/usercontroller');
// router.post('/auth', userController.authUser);
router.post('/signup',userController.registerUser);
router.post('/login', userController.authUser);
router.post('/logout',userController.logoutUser);

// admin
router.get('/users',userController.getAllUser);

router.delete('/users/:id', userController.deleteUser);
module.exports = router;