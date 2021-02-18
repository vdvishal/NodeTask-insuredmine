const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const Agent =  new Schema({
  agentName: String
})



mongoose.model('Agent', Agent);