const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3000 ;
const userRoute = require("./routes/userRoutes");
const listingRoute = require("./routes/listingRoute");
const bodyParser = require("body-parser");

dotenv.config();
app.use(cors()); 
app.use(bodyParser.json());//parse incoming json data
app.use(bodyParser.urlencoded({ extended: true }));


//connect database 
const connectDb = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL , { useNewUrlParser: true, useUnifiedTopology: true});
        console.log("MongoDb Database Connected !");
    }
    catch(err){
        console.error(err.message);

    }
}
connectDb();

//routes 
app.use("/api/users", userRoute);  //usersRoute
app.use("/api/listings" , listingRoute); //ListingsRoute


app.listen(PORT , ()=>{
    console.log(`server is running at ${PORT}`);
})