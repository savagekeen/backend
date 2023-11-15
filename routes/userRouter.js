const { signup, signin, verifyUserToken,  uploadImage } = require("../controllers/userController")

const express = require("express")
const validate = require("../middlewares/Validator")
const userValidationSchema = require("../middlewares/userValidationSchema")

const userRouter = express.Router()


userRouter.post("/signup",  validate(userValidationSchema), signup)
userRouter.post("/signin", signin)
userRouter.get("/verify", verifyUserToken)
userRouter.post("/upload", uploadImage)

module.exports = userRouter