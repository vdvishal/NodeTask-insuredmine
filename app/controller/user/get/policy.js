const mongoose = require("mongoose");
const Users = mongoose.model('Users');

const get = async (req,res) => {
    
    Users.aggregate([
        {
            $limit: parseInt(req.query.limit) || 50
        },
        {
            $lookup: {
                from: "policyinfos",
                localField: "_id",
                foreignField: "userId",
                as: "policyInfo" 
            }
        }
    ]).then(response => res.status(200).json({data:response}))
        .catch(err => {
        console.log(err);
        res.status(500).json({message:"Database Error"}) 
    })

}

module.exports = get;