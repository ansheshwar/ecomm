const user_model = require("../models/user.model")

/**
 *  creat a mw that will check if the request body is proper and correct
 */

const verifySignupBody = async (req,res,next)=>{
    try{
        // check for the name
        if(!req.body.name){
            return res.status(400).send({
                message : "Failed ! name was not provided in the request body"
            })
        }
        // check for the email
        if(!req.body.email){
            return res.status(400).send({
                message : "Failed ! email was not provided in the request body"
            })
        }

        // check for the userID
        if(!req.body.userId){
            return res.status(400).send({
                message : "Failed ! UserId was not provided in the request body"
            })
        }

        //check if the user with the same userId is already present

        const user = await user_model.findOne({userId : req.body.userId})
        if(user){
            return res.status(400).send({
                message : "Failed ! user with same UserId is already present"
            })
        }

        next()

    } catch(err){
        console.log("error while validating the request objecyt",err)
        res.status(500).send({
            message : "error while validating the request body"
        })
    }
}

const verifySignInBody =  (req,res,next)=>{
    if(!req.body.userId){
        return res.status(400).send({
            message : "User id is not provided"
        })
    }
    if(!req.body.password){
        return res.status(400).send({
            message : "passowrd is not provided"
        })
    }

    next()
}
module.exports = {
    verifySignupBody : verifySignupBody,
    verifySignInBody : verifySignInBody
}