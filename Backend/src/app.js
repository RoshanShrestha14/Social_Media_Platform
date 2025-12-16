require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");


async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected");
  } catch (err) {
    console.log("MongoDB Connection Failed!", err);
  }
}
connectDB();


app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // For form data


app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.get("/",(req,res)=>{
  res.json("hi i am root")
})
module.exports = app;