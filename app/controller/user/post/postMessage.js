

const postMessage = (req,res) => {
    childId.send(JSON.stringify(req.body));
    res.status(201).json({message:"Process quene"})
}

module.exports = postMessage;