const authMw = require("../middlewares/auth.mw")

/**
 * POST localhost:8888/ecomm/api/v1/auth/categories
 */
category_controller = require("../controllers/category.controller")

auth_MW = require("../middlewares/auth.mw")
module.exports =(app) =>{
    app.post("/ecomm/api/v1/auth/categories",[authMw.verifyToken,authMw.isAdmin],category_controller.createNewCategory)
}