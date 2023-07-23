import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        min:[3,'username atleast contain 3 characters'],
        max:[15,'username maximum can include 15 characters'],
        required:[true,'username is necessary']
    },
    email:{
        type:String,
        required:[true,'email is necessary']
    }
},
{
    timestamps:true
}
);
userSchema.plugin(mongoosePaginate);

export const User = mongoose.model('User',userSchema);