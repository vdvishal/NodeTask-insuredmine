const mongoose = require("mongoose");
require("../models/userMessage")
mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true, useUnifiedTopology: true });

const Usermessage = mongoose.model('Usermessage');
const moment = require("moment");

process.on('message', (message) => {
    let data = JSON.parse(message);
    
    console.log(data)

    let timeout = moment(`${data.day} ${data.time}`,"DD/MM/YYYY HH:mm:ss").valueOf() - moment().valueOf()
 
    setTimeout(() => {
        console.log(data);
        Usermessage.create({
            message: data.message,
            day: data.day,
            time: data.time
        }).then(response => {
            console.log(JSON.stringify(response));
        })
        .catch(err => {
            console.log(JSON.stringify(err));
        })
    }, timeout);

});