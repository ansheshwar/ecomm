/**
 * i need to write the controller  or logic to register a user
 */
const bcrypt = require("bcryptjs")
const user_model = require("../models/user.model")
// signup module is use to create or register the user
exports.signup = async (req, res) => {
    /**
     * logic to create the user
     */

    //1. read the request body 

    //here req.body will give me the request body in the form of js object
    const request_body = req.body

    //2. inster the data in the users collection in MongoDB
    const userObj = {
        name: request_body.name,
        userId: request_body.userId,
        email: request_body.email,
        userType: request_body.userType,
        password: bcrypt.hashSync(request_body.password, 8)
    }

    try {
        console.log("signup")
        const user_created = await user_model.create(userObj)
        /**
         * once the user was created then i should return this user
         */
        //jab hum create karte hai and agar vo successfully create ho jaye to uska http status code is "201" ,this code shows that something is successfully created.
        const res_obj ={
            name : user_created.name,
            userId : user_created.userId,
            email : user_created.email,
            userType : user_created.userType,
            createdAt :user_created.createdAt,
            updatedAt : user_created.updatedAt,
        }
        res.status(201).send(res_obj)

    } catch (err) {
        console.log("error  while registering the user:", err)
        // 500 shows internal server error 
        res.status(500).send({
            message : "some error happened while registering the user"
        })
    }

    //3. return the response back to the user
}


// route is the layer which will intercept the request