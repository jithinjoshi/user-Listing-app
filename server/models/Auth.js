import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'username is requred'],
        min:[3,'username must contain three characters']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:[true,'enter a unique email']
    },
    password:{
        type:String,
        required:[true,'password is required'],
        min:[6,'password must contain six characters']
    }
});

export const Admin = mongoose.model('Admin',adminSchema);