const mongoose = require("mongoose")
const AuthUserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
},{timestamps:true})

const AuthUser = mongoose.model("AuthUser",AuthUserSchema)

module.exports = {
    AuthUser
}