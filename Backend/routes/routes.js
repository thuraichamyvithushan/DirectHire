// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../model/model.js'); 
// const { generateToken } = require("../utilies/generateToken.js");

// const router = express.Router();

// router.post('/register', async (req, res) => {
//   try {
//     const {name, email, password } = req.body;

//     const userExist = await User.findOne({ email }); 
   
//     if (userExist) {
//        return res.status(401).json({ success: false, message: 'User already exists' });
//     }

//     const newUser = await User.create({ name, email, password });
//     if (newUser) {
//       generateToken(res, newUser._id);
//       return res.status(201).json({ success: true, message: 'Registration successful', user: newUser });
//     }
    
//   } catch (err) {
//     return res.status(500).json({ success: false, error: err.message });
//   }
// });

// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(401).json({ success: false, message: 'Invalid email' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ success: false, message: 'Invalid password' });
//     }

//     generateToken(res, user._id);

//     if (user.isAdmin) {
//       return res.json({ success: true, message: `Admin login successful for user ${user.name}` });
//     } else {
//       return res.json({ success: true, message: `User login successful for user ${user.name}` });
//     }

//   } catch (err) {
//     return res.status(500).json({ success: false, error: err.message });
//   }
// });

// router.post('/logout', async (req, res) => {
//   try { 
//     res.clearCookie('jwt');  
//     return res.json({ success: true, message: 'User logout successful' });
//   } 
//   catch (err) {
//     return res.status(500).json({ success: false, error: err.message });
//   }
// });

// router.get('/getuser/:id', async (req, res) => {
//   try {
//     const data = await User.findById(req.params.id);
//     return res.json({ success: true, message: 'Get user successful', user: data });
//   } catch(error) {
//     return res.status(500).json({ success: false, error: error.message });
//   }
// });

// router.delete('/delete/:id', async (req, res) => {
//   try {
//     const id = req.params.id;
//     const data = await User.findByIdAndDelete(id);
//     return res.send({ success: true, message: `Document with ${data.name} has been deleted` });
//   }
//   catch (error) {
//     return res.status(400).json({ success: false, error: error.message });
//   }
// });

// router.get('/getallusers', async (req, res) => {
//   try {
//     const users = await User.find({});
//     return res.json({ success: true, message: 'Get all users successful', users });
//   } catch(error) {
//     return res.status(500).json({ success: false, error: error.message });
//   }
// });

// module.exports = router;


















// // const express = require('express');
// // const bcrypt = require('bcrypt');
// // const jwt = require('jsonwebtoken');
// // const User = require('../model/model.js'); 
// // const {generateToken}=require("../utilies/generateToken.js")
// // const { model } = require('mongoose');


// // const router = express.Router();


// // router.post('/register', async (req, res) => {
// //   try {
// //     const { name, email, password } = req.body;
// //     console.log(req.body)

// //     const userExist=await User.findOne({email}); 
   
// //     if(userExist){
// //        res.status(401)
// //        throw new Error( 'User already exist')
// //     }

// //     const newUser =await User.create({ name, email, password});
// //     console.log(newUser)
// //    if(newUser){
// //     generateToken(res,newUser._id);
// //     res.status(201).json(newUser );
// //    }
    
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });



// // router.post('/login', async (req, res) => {
// //   try {
// //     const { email, password } = req.body;
// //     const user = await User.findOne({ email });

// //     if (!user) {
// //       return res.status(401).json({ message: 'Invalid email' });
// //     }

// //     const isPasswordValid = await bcrypt.compare(password, user.password);

// //     if (!isPasswordValid) {
// //       return res.status(401).json({ message: 'Invalid password' });
// //     }


// //     generateToken(res, user._id);


// //     if (user.isAdmin) {
// //       return res.json(`Admin login successful ${user.name}`)
      
// //     } else {
// //       return res.json (`User login successful ${user.name}`);
// //     }

// //   } catch (err) {
// //     return res.status(500).json({ error: err.message });
// //   }
// // });



// // router.post('/logout', async (req, res) => {
// //   try {
    
// //     res.clearCookie('jwt');
    
// //     return res.json (`User logout successful`);

// //   } 
// //   catch (err) {
// //     return res.status(500).json({ error: err.message });
// //   }
// // });




// // router.get('/getuser/:id', async (req, res) => {
// //   try{
// //       const data = await User.findById(req.params.id);
// //       res.json("login successful")
// //   }
// //   catch(error){
// //       res.status(500).json({message: error.message})
// //   }
// // })


// // router.delete('/delete/:id', async (req, res) => {
// //   try {
// //       const id = req.params.id;
// //       const data = await User.findByIdAndDelete(id)
// //       res.send(`Document with ${data.name} has been deleted..`)
// //   }
// //   catch (error) {
// //       res.status(400).json({ message: error.message })
// //   }
// // })

// // // Get all users
// // router.get('/getallusers', async (req, res) => {
// //   try {
// //     const users = await User.find({});
// //     res.json(users);
// //   } catch(error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // });

// // module.exports = router;
