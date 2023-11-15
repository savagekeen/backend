const express = require("express");
require("dotenv").config()
const app = express()
const port = 4000
const  mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const cors = require("cors")
app.use(cors({origin: "*"}))

app.use(express.json({limit:"100mb"}))
app.use(express.urlencoded({extended:true, limit: "100mb"}))

app.use("/users", userRouter)


const connect = () =>{
    mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("Connected to database successfully")
    }).catch((err)=>{
        console.log(err)
    })
}

connect()


app.listen(port, ()=>{
    console.log(`app listening on port ${port}`)
})