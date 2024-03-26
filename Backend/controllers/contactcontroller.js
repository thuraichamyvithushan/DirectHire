const mongoose = require('mongoose');

const Model = require('../model/contactmodel');

module.exports = {
    contactpost : async (req, res) => {
        const data = new Model({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
            
            
        })
    
        try {
            const dataToSave = await data.save();
            res.status(200).json(dataToSave)
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
    }
}