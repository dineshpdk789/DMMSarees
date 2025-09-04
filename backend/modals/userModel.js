const mongoose=require("mongoose");
const {Schema}=mongoose;
const validate=require("validator");
const bcrypt=require("bcrypt");
const crypto=require("crypto");


const userSchema=new Schema({
    name:{
        type:String,
        required:[true,"Please Enter your name"],
        maxLength:[25,"Invalid name Please enter short name "],
        minLength:[3,"Name should contaion more than 2 characters"]
    },
    email:{
        type:String,
        required:[true,"Plese enter your email"],
        unique:true,
        validate:[validate.isEmail,"Please enter valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
},{timestamps:true})

//verify password when login 
userSchema.methods.verifyPassword=async function(enteredpassword){
    return await bcrypt.compare(enteredpassword,this.password);
}




const User=mongoose.model("user",userSchema);
module.exports={User};