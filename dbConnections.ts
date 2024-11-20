import mongoose from 'mongoose';

export const mongoConnection= async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/deviceManagerDatabase').then(()=>{
            console.log("Connected to Database");
        })
    } catch (error) {
        console.log("Error in connecting to database",error);
    }
}