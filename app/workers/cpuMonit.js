const pm2 = require("pm2")
const os = require('os-utils');
setInterval(() => {
    os.cpuUsage((per) => {   
        console.log('CPU Usage:' + Math.round(per*100))  
        if(Math.round(per*100) > 70){
            restartServer();
        }       
    });
}, 250);

const restartServer = () => {
    pm2.connect(err => {
        if(err){
            process.exit();
        }

        pm2.restart("app",err => {});
    })
}