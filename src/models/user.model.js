import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        index: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,  // remove white spaces
        lowercase: true,
    },
    fullName:{
        type: String,
        required: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: [true,"Password is required"],
    },
    avatar: {
        type: String, //cloudinary url
        required: true,
    },
    coverImage:{
        type: String,
    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Video'
        }
    ],
    refreshToken:{
        type: String,
    }
},{timestamps: true});

//generate token
userSchema.pre('save', async function(next){
    //hash the password before saving the user model
    //this is a mongoose middleware
    //isModified is a mongoose method that checks if the password is modified
    if(!this.isModified('password')) return next();
    //hash takes two arguments, the password and the number of rounds to hash the password
    this.password=await bcrypt.hash(this.password,10);
    next();
});
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password);
}
userSchema.methods.generateAccessToken=function(){
    return jwt.sign({
        _id: this._id,
        email:this.email,
        name:this.name,
        fullName:this.fullName,
    },
    
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    );
}

export const User = mongoose.model('User', userSchema); 