import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
    "devicename":{type:String},
    "imei":{type:Number},
    "mailid":{type:String},
    "problem":{type:String},
    "password":{type:String},
    "mobilenumber":{type: String},
    "manufacturingdate":{type: Number, default:Date.now()},
    "saledate":{type: Number, default:Date.now()},
})

export const device_table_Schema_data = mongoose.model('device_table_Schema_data',deviceSchema,'device_table_Schema_data');