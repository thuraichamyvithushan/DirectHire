const mongoose = require('mongoose');
const cloudinary = require ('../utiliti/cloudinary');
const multer = require ('../utiliti/multer');

const Model = require('../model/wpost');

module.exports = {
    workpost : async (req, res) => {

        const result = await cloudinary.uploader.upload(req.file.path,{
            folder:"DirectHire_Work"
        })


        const data = new Model({
            jobtype: req.body.jobtype,
            description: req.body.description,
            workplace: req.body.workplace,
            name: req.body.name,
            telnumber: req.body.telnumber,
            image :{
                public_id:result.public_id,
                url:result.secure_url
            }
            
            
        })
    
        try {
            const dataToSave = await data.save();
            res.status(200).json(dataToSave)
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
    },

    workupdate :  async (req, res) => {
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

    workdelete : async (req, res) => {
        try {
            const id = req.params.id;
            const data = await Model.findByIdAndDelete(id)
            res.send(`Document with ${data.name} has been deleted..`)
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    },

    workgetall :async (req, res) => {
        try{
            const data = await Model.find({isPost:true});
            res.json(data)
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    },


    workgetallAdmin :async (req, res) => {
        try{
            const data = await Model.find();
            res.json(data)
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    },

}

  