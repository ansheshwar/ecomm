/**
 * POST localhost:8888/ecomm/api/v1/auth/signup
 * 
 * i need to intercept this
 */

const authController = require("../controllers/auth.controller")

const authMW = require("../middlewares/auth.mw")
module.exports = (app)=>{
    // authController.signup --> handover to the right controller
    app.post("/ecomm/api/v1/auth/signup" , [authMW.verifySignupBody],authController.signup)

    /**
     * define the rte for POST localhost:8888/ecomm/api/v1/auth/signin
     */

    app.post("/ecomm/api/v1/auth/signin",[authMW.verifySignInBody],authController.signin)
}