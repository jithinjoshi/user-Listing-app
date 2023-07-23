import mongoose from "mongoose";

export const database = () => {
    try {
        mongoose.connect(process.env.MONGODB).then(() => {
            console.log('Database connected successfully')
        })

    } catch (error) {
        console.log(error)

    }

}
