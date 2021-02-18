const mongoose = require("mongoose");
const Users = mongoose.model('Users');
const PolicyInfo = mongoose.model('PolicyInfo');

const search = async (req,res) => {
    try {
        
        let users = await Users.find({"firstName":{"$regex": req.query.search, '$options' : 'i' }})
                        .select("_id")
                        .exec()
                        .then(res => res)

        let userId = [];

        users.forEach(user => {
            userId.push(user._id);
        });

        let Policy = await PolicyInfo.aggregate([
        {
            $match:{
                    userId:{
                        $in: userId
                    }
                }
        },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "userInfo" 
            }
        },
        {
            $project:{
                "policyNumber": 1,
                "startDate": 1,
                "endDate": 1,
                "userInfo":{$arrayElemAt:["$userInfo",0]}
            }
        }
        ]).then(res => res)

        res.status(200).json({data:Policy})
    } catch (error) {
        console.log(JSON.stringify(error));
        res.status(500).json({message:"Database Error"}) 
    }

}


module.exports = search