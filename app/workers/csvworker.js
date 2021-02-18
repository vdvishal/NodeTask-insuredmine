const { workerData } = require('worker_threads');

const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
// const exec = require("child_process").execSync;

const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true, useUnifiedTopology: true });
const ObjectID = mongoose.mongo.ObjectID;
fs.readdirSync(path.resolve(__dirname,"../models")).forEach(file => {
    if (file.indexOf('.js')) require('../models' + '/' + file)
})


   
let Agent;
let CategoryName;
let Users;
let CompanyName;
let PolicyInfo;
let UserAccount;
let Temp;

mongoose.connection.on('open', function (err) {
    if (err) {
        logger.error(err, 'mongoose connection open handler', 10)
    } else {
        Agent = mongoose.model('Agent');
        CategoryName = mongoose.model('CategoryName');
        Users = mongoose.model('Users');
        CompanyName = mongoose.model('CompanyName');
        PolicyInfo = mongoose.model('PolicyInfo');
        UserAccount = mongoose.model('UserAccount');
        Temp = mongoose.model('TempCollections');

        insert();

     }
});
 



 
const insert = async () => {
    try {
        
        // const mongoImp = `mongoimport -d userDB -c tempcollections --type csv --file ${csvPath} --headerline --host localhost:27017`
        // exec(mongoImp);

        await insertToTempCollection().then();



        let condition = [
            {
                $group:{
                    _id:null,
                    agentName:{
                        $addToSet:"$agent"
                    },
                    userAccount:{
                        $addToSet:"$account_name"
                    },
                    companyName:{
                        $addToSet:"$company_name"
                    },
                    categoryName:{
                        $addToSet:"$category_name"
                    },
                    userInfo: {
                        $push:{
                            firstName:"$firstname",
  
                            Dob:"$Dob",
                            address:"$address",
                            phoneNumber:"$phoneNumber",
                            state:"$state",
                            zipCode:"$zipCode",
                            email:"$email",
                            gender:"$gender",
                            userType:"$userType",
                            agent:"$agent",
                            userAccount:"$account_name",
                            companyName:"$company_name",
                            categoryName:"$category_name",
                            policyNumber:"$policy_number",
                            policyStartDate:"$policy_start_date",
                            policyEndDate:"$policy_end_date",
                        }
                    }
                }
            }
        ]

        const lists = await Temp.aggregate(condition)
                            .then(res => res)

  
        let agentArr = []
        let accountArr = []
        let companyArr = []
        let categoryArr = []
        let userArr = []
        let policyArr = []

        let agentId = {}
        let accountId = {}
        let companyId = {}
        let categoryId = {}

        lists[0].agentName.forEach(agent => {
            let _id = new ObjectID()
            agentArr.push({agentName:agent,_id})
            agentId[agent] = _id;
        });

        lists[0].userAccount.forEach(account => {
            let _id = new ObjectID()
            accountArr.push({accountName:account,_id:_id})
            accountId[account] = _id;
        });

        lists[0].companyName.forEach(company => {
            let _id = new ObjectID()
            companyArr.push({companyName:company,_id})
            companyId[company] = _id;
        });

        lists[0].categoryName.forEach(category => {
            let _id = new ObjectID()
            categoryArr.push({categoryName:category,_id})
            categoryId[category] = _id;
        });

        lists[0].userInfo.forEach(user => {
            let _id = new ObjectID();
            userArr.push({
                _id,
                firstName:user.firstName,
                name:user.name, 
                Dob:user.Dob,
                address:user.address,
                phoneNumber:user.phoneNumber,
                state:user.state,
                zipCode:user.zipCode,
                email:user.email,
                gender:user.gender,
                userType:user.userType,
                agentId:agentId[user.agent],
                companyId:companyId[user.companyName],
                accountId:accountId[user.userAccount],
                categoryId:categoryId[user.categoryName],                
            })

            policyArr.push({
                userId:_id,
                companyId:companyId[user.companyName],
                categoryId:categoryId[user.categoryName], 
                policyNumber:user.policyNumber,
                startDate:user.policyStartDate,
                endDate:user.policyEndDate,
            })
        });

        Promise.all([
            await Agent.insertMany(agentArr).then(),
            await CategoryName.insertMany(categoryArr).then(),
            await CompanyName.insertMany(companyArr).then(),
            await UserAccount.insertMany(accountArr).then(),
            await Users.insertMany(userArr).then(),
            await PolicyInfo.insertMany(policyArr).then(),
        ]).then();

        await Temp.collection.drop();

        fs.unlink(path.resolve(__dirname,"../../csv",workerData.name),(err) => console.log(err));
        mongoose.connection.close();

    } catch (error) {
        mongoose.connection.close();
        console.log(error);
    }
    
  
    

    //console.log(csvHeaders);
}
 


const insertToTempCollection = () => new Promise((resolve,reject) => {
    const csvPath = path.resolve(__dirname,"../../csv",workerData.name);
    let bulkInsert = [];
    fs.createReadStream(csvPath)
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => bulkInsert.push(row))
    .on('end', end => {
        Temp.insertMany(bulkInsert, (err,response) => {
            if(err){
                console.log(JSON.stringify(err))
                return reject(err.message)
            }
    
            return resolve(response)
        })
    });


    
    
})

