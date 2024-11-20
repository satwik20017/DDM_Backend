"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dbConnections_1 = require("./dbConnections");
const deviceTableSchema_1 = require("./MongoSchema/deviceTableSchema");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
(0, dbConnections_1.mongoConnection)();
app.listen(5000, () => {
    console.log("Connected to Port: 5000");
});
app.get("/getDeviceData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield deviceTableSchema_1.device_table_Schema_data.find().then((result) => {
            return result;
        });
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        //   res.send(new failureResponse(400,"Error Fetching Data",error));
    }
}));
//   let devices:any = []
//   app.post('/insertDataFront',(req,res)=>{
//     const newDevice = req.body;
//     devices.push(newDevice)
//     const result =  device_table_Schema_data.insertMany(newDevice).then((result)=>{
//         return result;
//     });
//     res.status(200).json(newDevice)
//   })
app.post('/insertData', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        let convertManufacturingDate = new Date(body.manufacturingdate);
        let convertSaledata = new Date(body.saledate);
        body.manufacturingdate = convertManufacturingDate.getTime();
        body.saledate = convertSaledata.getTime();
        const result = yield deviceTableSchema_1.device_table_Schema_data.insertMany(body).then((result) => {
            return result;
        });
        res.status(200).json({
            status: 200,
            message: "Data inserted successfully",
            result: result
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: "Data insertion failed",
            err: error
        });
    }
}));
app.delete('/api/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = req.params.id;
        const deletedItem = yield deviceTableSchema_1.device_table_Schema_data.findOneAndDelete(itemId);
    }
    catch (error) {
        res.status(500).send({ message: 'Error deleting item', error: error });
    }
}));
app.delete('/api/deleteitems', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield deviceTableSchema_1.device_table_Schema_data.deleteMany();
        res.send({ message: "Deleted Successfully" });
    }
    catch (error) {
        console.log(error);
    }
}));
// app.put('/api/items/:id', async (req, res) => {
//     const { id } = req.params;
//     const updatedItem = req.body;
//    await device_table_Schema_data.updateOne({ _id: id }, { $set: updatedItem }, (err, result) => {
//       if (err) {
//         return res.status(500).send('Error updating item');
//       }
//       res.status(200).send('Item updated successfully');
//     });
//   });
app.put('/api/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateItem = req.body;
        const result = yield deviceTableSchema_1.device_table_Schema_data.findByIdAndUpdate(id, { $set: updateItem }, { new: true });
        if (!result) {
            return res.status(404).send({ message: 'Item not found' });
        }
        return res.status(200).send({ message: 'Updated', result: result });
    }
    catch (error) {
        console.error('Error updating item:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}));
