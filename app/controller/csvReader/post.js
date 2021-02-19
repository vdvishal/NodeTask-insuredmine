const { Worker } = require('worker_threads');
const path = require("path");

const mongoose = require('mongoose');

const Temp = mongoose.model('TempCollections');
const Agent = mongoose.model('Agent');

const post = async (req, res) => {
const worker = new Worker(path.resolve(__dirname,"../../workers/csvworker.js"), {workerData:{ name: req.file.filename}});
 
    
  worker.on('error', (err) => { console.log(err); });
  worker.on('message', (msg) => {
      console.log('msg: ', msg);
  });
  
  res.status(201).json({message:"CSV Uploaded"});

 }

module.exports = post;