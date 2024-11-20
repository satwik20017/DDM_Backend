"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.device_table_Schema_data = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const deviceSchema = new mongoose_1.default.Schema({
    "devicename": { type: String },
    "imei": { type: Number },
    "mailid": { type: String },
    "problem": { type: String },
    "password": { type: String },
    "mobilenumber": { type: String },
    "manufacturingdate": { type: Number, default: Date.now() },
    "saledate": { type: Number, default: Date.now() },
});
exports.device_table_Schema_data = mongoose_1.default.model('device_table_Schema_data', deviceSchema, 'device_table_Schema_data');
