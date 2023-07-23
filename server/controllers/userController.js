import { updateUserValidation } from "../helpers/updateUserValidation.js";
import { validateUser } from "../helpers/userValidation.js";
import { User } from "../models/User.js"

export const getAllUsers = (async(req,res)=>{
    try {
        const allUsers =  await User.find({});
        res.status(201).json({users:allUsers});  
    } catch (error) {
        res.status(500).json({err:error})
    }
})

export const createUser = (async(req,res)=>{
    try {
        const {error,value} = validateUser(req.body);
        if(error){
            return res.status(422).json({err:error?.details[0]?.message})
        };

        

        const user = await User.find({email:value?.email});

        


        const newUser = await User({
            username:value?.username,
            email:value?.email
        });

        await newUser.save();
        res.status(201).json({success:newUser});
        
    } catch (error) {
        res.status(500).json({err:error})
        
    }
});


export const updateUser = (async(req,res)=>{
    try {
        const {id} = req.params;
        const {error,value} = updateUserValidation(req.body);
        console.log(id,value)
        if(error){
            return res.status(422).json({err:error?.details[0]?.message})
        }
        const update = await User.findByIdAndUpdate({_id:id},value);
        res.status(200).json({success:'data updated successfully'})
        
    } catch (error) {
        res.status(500).json({err:error})
        
    }
});

export const deleteUser = (async(req,res)=>{
    try {
        const {id} = req.params;
        const deleteUser = await User.findByIdAndDelete({_id:id});
        res.status(204).json({success:"user deleted successfully"})
    } catch (error) {
        res.status(500).json({err:error})
    }
})

export const getSingleUserData = async (req, res) => {
    try {
        const { id } = req.params;

        const userData = await User.findOne({ _id: id });

        if (!userData) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};