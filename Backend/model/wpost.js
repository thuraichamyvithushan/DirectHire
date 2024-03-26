const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({

    jobtype: {
        required: true,
        type: String,
        enum : ['painting' , 'constructionworks' ,'electrician' , 'plumbing' ,'carpenting' ,'welding']
    },
    description:{
    required:true,
    type:String
    },
    workplace: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    telnumber: {
        required: true,
        type: String
    },
    
    image: {
        public_id:{type:String},
        url : {type:String}
    },
    timestamp: {
        type : Date,
        default:Date.now,
    },
    isPost: {
        type: Boolean,
         default: false,
        }


})

module.exports = mongoose.model('workdata', dataSchema)