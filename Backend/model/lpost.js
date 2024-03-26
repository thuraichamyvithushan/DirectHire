const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: String
    },
    address: {
        required: true,
        type: String
      
    },
    job: {
        required: true,
        type: String,
        enum : ['painter' , 'constructionworkers' ,'electrician' , 'plumber' ,'carpenter' ,'welder']
    },
    experience: {
        required: true,
        type: String
    },
    telnumber:{
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
        },
   

})

module.exports = mongoose.model('labourdata', dataSchema)