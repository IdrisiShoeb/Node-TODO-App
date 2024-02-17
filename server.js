import { app } from "./app.js";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_DB_URI).then(()=>{
    console.log("Database connected")
}).catch((e)=>{
    console.log(e)
})

app.listen(5000, () => {
  console.log(
    `Server is working on port: 5000 in ${process.env.NODE_ENV} Mode`
  );
});