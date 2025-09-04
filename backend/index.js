const express = require("express");
const app = express();
const dotenv=require("dotenv");
const mongoose = require("mongoose");
const { main } = require("./config/db");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require('cors');

if(process.env.NODE_ENV!="PRODUCTION"){
dotenv.config();
}



// setting cloudinary
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SEC
})


//middleware
app.use(cookieParser());  // parse cookies from the incoming HTTP requests, and make them easily accessible via req.cookies.
app.use(express.json()); // Parses incoming JSON request bodies and makes them available as req.body.
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
app.use(express.urlencoded({extended: true })); // For parsing application/x-www-form-urlencoded
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));






// importing route
const authRouter=require("./route/userRoute");
const productRouter=require("./route/productRoute");
const orderRouter=require("./route/orderRoute");
const paymentrouter=require("./route/paymentRoutes");

// routes
app.use("/api/v1",authRouter);
app.use("/api/v1",productRouter);
app.use("/api/v1",orderRouter);
app.use("/api/v1",paymentrouter);


//serve static files
app.use(express.static(path.join(__dirname,"../Frontend1/dist")))
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../Frontend1/dist/index.html"));
});

app.get('/some-route', async (req, res) => {
  try {
    // ...your code...
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const InitializeConnection = async () => {
    try {

        await main();
        console.log("connected to database");

        app.listen(process.env.PORT, () => {
            console.log("server is runnning on " + process.env.PORT);

        })

    }
    catch (error) {
        console.log(error.message);

    }
}
InitializeConnection();

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});