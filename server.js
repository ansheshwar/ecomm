/**
 * This will be the starting of the project
 */

const express = require("express")
const mongoose = require("mongoose")
const app = express()
const server_config = require("./configs/server.config")
const db_config = require("./configs/db.config")
const user_model = require("./models/user.model")
const bcrypt = require("bcryptjs")

// express.json() is the middleware
/**
 * postman mai request body json format hai 
 * hamari application node js envirn=onment mai hai jo sirf js object samjhta hai 
 * to isliye pehle hume json ko js object mai convert karna hai 
 */
app.use(express.json())
/**
 * create an admin user at the starting of the application
 * if not already present
 */
//connection with mongodb
mongoose.connect(db_config.DB_URL)

const db = mongoose.connection
db.on("error", () => {
    console.log('error while connecting to the mongodb')
})
db.once("open", () => {
    console.log('connected to mongodb')
    init()
})

async function init() {
    try { // writing code for creating the user 
        let user = await user_model.findOne({ userId: "admin" })
        if (user) {
            console.log("admin is already present")
            return
        }
    } catch (err) {
        console.log("error while readin the data:", err)
    }
    try {
        user = await user_model.create({
            name: "ansh",
            userId: "admin",
            email: "ecomproject@gmail.com",
            userType: "ADMIN",
            //password : "Welcome!" here the password is in normal string so we need to first encrypt the  password and then save it .
            password: bcrypt.hashSync("welcome!", 8) // format :bcrypt.hashSync(password,costfactor)
        })

        console.log("admin created ", user)
    } catch (err) {
        console.log("error while creating admin:", err)
    }
}

/**
 * Stich the route to the server
 */

// calling the route and passing the app object for auth 
require("./routes/auth.routes")(app)

// calling the route and passing the app object for category
require("./routes/category.routes")(app)
/**
 * Start the server
 */
app.listen(server_config.PORT, () => {       // this code is customizable ...to isko hard code value mat karo isliye config folder banega and store hogi ye value 
    console.log("Server started at port num:", server_config.PORT)
})
