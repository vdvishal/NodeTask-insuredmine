const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const policyInfo =  new Schema({
  csvId: String,
  policyNumber: String,
  startDate: String,
  endDate: String,
  categoryId:{
    type:mongoose.Types.ObjectId
  },
  companyId:{
    type:mongoose.Types.ObjectId
  },
  userId:{
    type:mongoose.Types.ObjectId
  },
})



mongoose.model('PolicyInfo', policyInfo);