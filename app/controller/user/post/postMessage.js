const mongoose = require("mongoose");
const Usermessage = mongoose.model('Usermessage');
const moment = require("moment");

const postMessage = (req,res) => {
    console.log(req.body);
 
    Usermessage.create({
        message: req.body.message,
        day: req.body.day,
        time: moment.unix(req.body.time)
    }).then(response => res.status(200).json({message:"Message has been saved"}))
    .catch(err => {
        console.log(JSON.stringify(err));
        if(err.errors && err.errors.message && err.errors.message.name == "ValidatorError"){
            return res.status(400).json({message:err.errors.message.message})
        }
        res.status(500).json({message:"Db error, please try again later"})
    })
}

module.exports = postMessage;