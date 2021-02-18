const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const companyName =  new Schema({
  companyName: String
})



mongoose.model('CompanyName', companyName);