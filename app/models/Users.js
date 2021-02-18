const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const User =  new Schema({
    firstName:String,
    name:String, 
    Dob:String,
    address:String,
    phoneNumber: Number,
    state:String,
    zipCode:String,
    email:String,
    gender:String,
    userType:String,
    agentId:{
      type:mongoose.Types.ObjectId
    },
    companyId:{
      type:mongoose.Types.ObjectId
    },
    accountId:{
      type:mongoose.Types.ObjectId
    },
    categoryId:{
      type:mongoose.Types.ObjectId
    },
})



mongoose.model('Users', User);