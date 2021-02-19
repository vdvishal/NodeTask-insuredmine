const upload = require("../library/multer");
const csvReader = require("../controller/csvReader");

module.exports.setRouter = (app) => {
    app.post(`/upload`,upload.single("csvFile"),csvReader)
 }
