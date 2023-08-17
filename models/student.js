const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema ({
    name: {
        type:String,
        // required:true,
    },
    roll:  {
        type:Number,
        // required:true,
    },
    branch:{
        type:String,
        // required:true,
    },
    ctc:{
        type:Number,
        // required:true,
    },
    placed:  {
        type:Boolean,
        // required:true,
    },
    email:{
        type:String,
    },
    linkedin: {
        type:String,
    },
    github:  {
        type:String,
    },
    instagram:{
        type:String,
    },
    company:  {
        type:String,
    },
    instituteRank:{
        type:Number,
    }
})

module.exports = mongoose.model('SelectedStudent',studentSchema);