const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const Agent =  new Schema({
  csvId: String,
  agentName: String,
  
})



mongoose.model('Agent', Agent);