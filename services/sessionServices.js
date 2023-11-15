const jsonwebtoken = require("jsonwebtoken")
const secretkey = process.env.JWT_SECRET
require ("dotenv").config()

const generateToken = (payload) =>{
    try{
        return jsonwebtoken.sign({payload}, secretkey, {expiresIn: "1hr"})

    }catch (error) {
          console.log(error)
    }
}

const verifyToken = (token) =>{
    try{
        
        if(token){
            throw new Error({name: "AuthenticationError", message:"invalid token"})
        }
        const decodedToken = jsonwebtoken.verify(token, secretkey)
        const email = decodedToken.payload
        return email
    }
    catch(error){
        console.log(error)
        if (error.name === "TokenExpiredError"){
            throw new Error("session expired, Please login again")
        }
        throw new Error("Please Login to continue")
    }
}

module.exports = {generateToken, verifyToken}