const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const TempCollection = new Schema({
    "agent" : String,
    "userType" :String,
    "policy_mode" : Number,
    "producer" :String,
    "policy_number" :String,
    "premium_amount_written" :String,
    "premium_amount" : Number,
    "policy_type" :String,
    "company_name" :String,
    "category_name" :String,
    "policy_start_date" :String,
    "policy_end_date" :String,
    "csr" :String,
    "account_name" :String,
    "email" :String,
    "gender" :String,
    "firstname" :String,
    "city" :String,
    "account_type" :String,
    "phone" : String,
    "address" :String,
    "state" :String,
    "zip" :String,
    "dob" :String,
    "primary" :String,
    "Applicant ID" :String,
    "agency_id" :String,
    "hasActive ClientPolicy" :String
},{strict:false})



mongoose.model('TempCollections', TempCollection);