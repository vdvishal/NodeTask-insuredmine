const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const categoryName =  new Schema({
  csvId: String,
  categoryName: String,
 
})



mongoose.model('CategoryName', categoryName);