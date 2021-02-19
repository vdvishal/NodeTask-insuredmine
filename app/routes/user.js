 const get = require("../controller/user/get");
 const post = require("../controller/user/post");

module.exports.setRouter = (app) => {

    app.get(`/users`,get.policy)
    app.get(`/search`,get.search)

    app.post('/message',post)
}
