const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const UserAccount =  new Schema({
  accountName: String
})



mongoose.model('UserAccount', UserAccount);