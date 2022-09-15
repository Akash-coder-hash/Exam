const { Schema, default: mongoose } = require("mongoose");

const coursesSchema = new Schema({
    name:{
        type:String,
        required:true
    },

});

module.exports = mongoose.model('Courses',coursesSchema);