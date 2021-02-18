var multer  = require('multer')
var storage = multer.diskStorage(
    {
        destination: __dirname + "../../../csv",
        filename: function ( req, file, cb ) {
            cb( null, Date.now() + '.csv');
        }
    }
);

let upload = multer({ storage: storage });

module.exports = upload;