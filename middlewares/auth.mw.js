const user_model = require("../models/user.model")

const jwt = require("jsonwebtoken")
const auth_config =require("../configs/auth.config")

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

const verifyToken = (req,res,next)=>{
    // Check if the token is present in the header
     const token = req.headers['x-access-token']

     if(!token){
        return res.status(403).send({
            message : " No token found : Unauthorized"
        })
     }
    // if it's the valid token
    jwt.verify(token,auth_config.secret,async(err,decoded)=>{
        if(err){
            console.log("error is :",err)
            return res.status(401).send({
                message : "unAuthorized !"
            })
        }
        const user = await user_model.findOne({userId :decoded.id})
        if(!user){
            return res.status(400).send({
                message : "unAuthorized , the user for this token doesn't exit"
            })
        }
        //set the use info in the body 
        req.user = user
        //then move to the next step only if it is verified
        next()
    })
}

const isAdmin = (req,res,next)=>{
    const user = req.user
    if(user && user.userType == "ADMIN"){
        next()
    }else{
        return res.status(403).send({
            message : "only ADMIN users are allowed to access this endpoint"
        })
    }
}
module.exports = {
    verifySignupBody : verifySignupBody,
    verifySignInBody : verifySignInBody,
    verifyToken : verifyToken,
    isAdmin : isAdmin
}