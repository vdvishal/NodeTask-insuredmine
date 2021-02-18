const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const companyName =  new Schema({
  csvId: String,
  companyName: String,
})



mongoose.model('CompanyName', companyName);