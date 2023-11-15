const userModel = require("../models/userModel");
const bcryptsjs = require("bcryptjs");
const { generateToken, verifyToken } = require("../services/sessionServices");
const {cloudinary} = require("../utils/cloudinaryConfig")
const {sendMail} = require("../utils/Mailer")

const signup = async(req, res) =>{
    try {
        const {userName, email, password} = req.body
        if(userName === "" || email === "" || password === ""){
            return res.status(400).send({message: "input fields cannot be empty"})
        }
        const existing = await userModel.findOne({email})
        if (existing){
            res.status(409) .send({message: "User already exist"})
        }
        const result = await userModel.create({userName, email, password})

    if (!result){
    return    res.status(500) . send({message: "Error creating user"})
    }
    sendMail(email, userName)
    
    return res.status(201) .send({message: "Account created successfully"})
    } catch (error) {
        console.log(error)
        return res.status(401).send({message: error.message})
        next(error)
    }
}

const signin = async(req, res) =>{
    try {
        console.log(req.body)
        const {email, password} = req.body
        const result = await userModel.findOne({email})
        console.log(result)
        const compare = await bcryptsjs.compare(password, result.password)
        if (!result || !compare){
            return res.status(401).send({message: "invalid"})
        }
        const token = generateToken(result.email)
        return res.status(200).send({message: `Welcome ${result.userName}`, token})
    } catch (error) {
        console.log(error)
        
    }
 
}

const verifyUserToken = async (req, res, next) =>{
    try{
        const auth = req.headers.authorization
        const token = auth.split(" ")[1]
        if (!token){
            return res.status(401).send({ message: "unathorized", status:false})
        }
        const userEmail = verifyToken(token)
        const user = await userModel.findOne(({email: userEmail}))
         
        return res.status(200).send({message: "verification successfully", userEmail, status: true})
    }

    catch (error){
console.log(error)
return res.status(401).send({message: error.message})
next(error)
    }
}
const uploadImage = async(req, res) => {
    const {file} = req.body
    console.log(file)
    try{
        const result = await cloudinary.uploader.upload(file)
        console.log(result)

        const sec_url = result.secure_url
        return res.status(201).send({message: "Image uploaded to cloudinary", sec_url})
    }catch (error){    
        console.log(error)

    }
}

module.exports = {signin, signup, verifyUserToken, uploadImage}