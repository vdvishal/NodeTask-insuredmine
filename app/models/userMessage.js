const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const Usermessage =  new Schema({
  message: {type:String, required: true},
  day: {type:String, required: true},
  time: {type:String, required: true},
})



mongoose.model('Usermessage', Usermessage);