import app  from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
dotenv.config({ path: "./.env" })

const portNumber = process.env.PORT || 8000;

connectDB().then(()=>{
  app.listen(portNumber, () => {
    console.log(`Server running on port ${portNumber}`);
  });
})
.catch((err)=>{
  console.log("Error connecting to db!!");
})



app.get('/', (req,res)=>{
  res.json({message:"Hello"});
})

app.post('/user',(req,res)=>{
  console.log(req.body);
  console.log(req.query);
  // res.json({req});
  res.json({status:200, message:"Successful"});
})
