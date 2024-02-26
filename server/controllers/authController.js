const { hashPassword,comparePassword } = require("../helpers/auth.js");
const { AuthUser } = require("../models/user.js");
const jwt = require("jsonwebtoken")
//  jay hind dosto

const test = (req,res)=>{
    res.json("jay hind dosto")
}
const registerUser = async (req,res)=>{
    const {name,email,password} = req.body;
    if(!name){
       return  res.json({
        error:"All the fields are Required"
       })
    }
    if(!password || password.length<6){
        return  res.json({
         error:"Password is require and should be atleat 6 character long"
        })
     }

     if(!email){
        return  res.json({
         error:"All the fields are Required"
        })
     }

     const exist = await AuthUser.findOne({email})
     if(exist){
        return  res.json({
         error:"Email is taken Already"
        })
     }
     const hashedPassword = await hashPassword(password)
    const user = await AuthUser.create({
        name,
        email,
        password:hashedPassword
    })

    if(!user)
    {
        return res.status(400).json("Error while Creating User")
    }

    return res.json(user)
}

// login endpoint

const loginUser = async (req,res)=>{

    try {
        const {email,password} = req.body;
        if(!email)
       {
        return  res.json({
            error:"Email is required"
           })
       }

       const user = await AuthUser.findOne({email})
       if(!user){
        return  res.json({
            error:"No user found"
           })
       }
// check if password match stor cookie and set on background
       const match = await comparePassword(password,user.password)
       // assign cookie , jwt 
       if (match) {
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
       
        user.tokens = user.tokens.concat({token})
        await user.save();

        res.cookie("access_token",token,{
            expires:new Date(Date.now() + 15*60*1000),
            httpOnly:true
        })
        
       
      
    }
    
       if(!match)
       {
        return  res.json({
            error:"password do not match"
           })
       }
       return res.json({user})

    } catch (error) {
        console.log(error);
    }
}

const getprofile = async (req,res)=>{

    try {
        const user = await AuthUser.findById(req.user)
        res.json(user)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getprofile
}