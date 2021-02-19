const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const UserAccount =  new Schema({
  csvId: String,
  accountName: String,

})



mongoose.model('UserAccount', UserAccount);