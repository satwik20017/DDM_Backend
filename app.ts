import express from "express";
import bodyParser from 'body-parser'
import cors from 'cors'
import { mongoConnection } from "./dbConnections";
import { device_table_Schema_data } from "./MongoSchema/deviceTableSchema";
const app = express();
app.use(express.json());
app.use(cors())
app.use(bodyParser.json())

mongoConnection();
app.listen(5000, () => {
  console.log("Connected to Port: 5000");
});


app.get("/getDeviceData", async (req, res) => {
    try {
     const data = await device_table_Schema_data.find().then((result)=>{
        return result
     })
     res.status(200).json(data)
    } catch (error) {
        console.log(error);
    //   res.send(new failureResponse(400,"Error Fetching Data",error));
    }
  });

//   let devices:any = []
//   app.post('/insertDataFront',(req,res)=>{
//     const newDevice = req.body;
//     devices.push(newDevice)
//     const result =  device_table_Schema_data.insertMany(newDevice).then((result)=>{
//         return result;
//     });
//     res.status(200).json(newDevice)
//   })

  app.post('/insertData',async (req, res) => {
    try {
        const body = req.body;


        let convertManufacturingDate= new Date(body.manufacturingdate);
        let convertSaledata = new Date(body.saledate)
        
        body.manufacturingdate= convertManufacturingDate.getTime()
        body.saledate= convertSaledata.getTime()


        const result = await device_table_Schema_data.insertMany(body).then((result)=>{
            return result;
        });

        res.status(200).json({
            status: 200,
            message: "Data inserted successfully",
            result: result
        });

       
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: "Data insertion failed",
            err: error
        });
    }
});


app.delete('/api/items/:id',async (req,res)=>{
    try {
        const itemId = req.params.id;
        const deletedItem = await device_table_Schema_data.findOneAndDelete(itemId)
    } catch (error) {
        res.status(500).send({ message: 'Error deleting item', error: error });
    }
})

app.delete('/api/deleteitems',async (req,res)=>{
    try {
        await device_table_Schema_data.deleteMany();
        res.send({message:"Deleted Successfully"})
    } catch (error) {
        console.log(error);
    }
})


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
  

app.put('/api/items/:id', async (req, res) => {
    try {
      const { id } = req.params;  
      const updateItem = req.body; 
  
     
      const result = await device_table_Schema_data.findByIdAndUpdate(
         id ,
        { $set: updateItem },
        { new: true } 
      );
  
      if (!result) {
        return res.status(404).send({ message: 'Item not found' });
      }
  
      return res.status(200).send({ message: 'Updated', result: result });
  
    } catch (error) {
      console.error('Error updating item:', error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });
  