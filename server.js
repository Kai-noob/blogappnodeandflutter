const express=require("express");
const app=express();
const userRoute=require("./routes/userroutes")
const mongoose=require("mongoose");


app.use(express.json());

app.use("/user",userRoute);


const PORT=process.env.PORT||5000

// mongodb+srv://nayyairlinn:123456@cluster0.kwiss.mongodb.net/blogapp?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://admin:admin@cluster0.kwiss.mongodb.net/blogapp?retryWrites=true&w=majority", {
      useNewUrlParser: true,
useCreateIndex:true,
useUnifiedTopology:true
});
const connection=mongoose.connection;

connection.once("open",()=>{
      console.log("Mongodb connected")
});


app.get("/",(req,res)=>{
      res.json("Hello")
})

app.listen(PORT,()=>{
      console.log(`Server is running at ${PORT}`);
})