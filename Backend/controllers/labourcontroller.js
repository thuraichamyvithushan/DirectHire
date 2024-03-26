const mongoose = require('mongoose');
const cloudinary = require ('../utiliti/cloudinary');
const multer = require ('../utiliti/multer');





const Model = require('../model/lpost');

module.exports = {
    labourpost : async (req, res) => {

       
        const result = await cloudinary.uploader.upload(req.file.path,{
            folder:"DirectHire"
        })


        const data = new Model({
            name: req.body.name,
            age: req.body.age,
            address: req.body.address,
            job: req.body.job,
            experience: req.body.experience,
            telnumber: req.body.telnumber,
            image :{
                public_id:result.public_id,
                url:result.secure_url
            },

        })
    
        try {
            const dataToSave = await data.save();
            res.status(200).json(dataToSave)
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
    },

    labourgetbyid :  async (req, res) => {
        try{
            const data = await Model.findById(req.params.id);
            res.json(data)
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    },

    labourupdate :  async (req, res) => {
        try {
            const id = req.params.id;
            const updatedData = req.body;
            const options = { new: true };
    
            const result = await Model.findByIdAndUpdate(
                id, updatedData, options
            )
    
            res.send(result)
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    },

    labourdelete :  async (req, res) => {
        try {
            const id = req.params.id;
            const data = await Model.findByIdAndDelete(id)
            res.send(`Document with ${data.name} has been deleted..`)
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    },


    labourgetallAdmin :async (req, res) => {
        try{
            const data = await Model.find();
            res.json(data)
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    },

 
   

    labourgetall :async (req, res) => {
        try{
            const data = await Model.find();
            res.json(data)
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    },


}