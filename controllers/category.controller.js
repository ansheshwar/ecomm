const category_model =require("../models/category.model")
/**
 * controller for creating the category
 * 
 * POST localhost:8888/ecomm/api/v1/auth/categories
 * 
 * request body : 
 *      {
    "name" : "HouseHold",
    "description" : "This will have all the household items"
      }
 */

exports.createNewCategory = async (req,res) =>{
    // read the req object
    // create the category object
    const cat_data ={
        name : req.body.name,
        description : req.body.description
    }
    try{
        // insert into mongoDB
        const category = await category_model.create(cat_data)
        return res.status(201).send(category)

    }catch(err){
        console.log("error while creating the category",err)
        // 500 matlab hai ki internal error hai 
        return res.status(500).send({
            message : "Error while creating the category"
        })
    }
    //return the response of the created category
}      