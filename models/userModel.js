const mongoose = require("mongoose")
const bcryptsjs = require("bcryptjs")



const userSchema = new  mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
email: {
    type: String,
    required: true,
    unique: true
},
password: {
    type: String,
    required: true
}
})

userSchema.pre("save", function(next){
    if (this.password != undefined){
        bcryptsjs.hash(this.password, 10).then(hash =>{
            this.password = hash
            next()
        }).catch(err =>{
            console.log(err);
        })



    }
})

const userModel = mongoose.models.users_tbs || mongoose.model("user_tbs", userSchema)

module.exports = userModel