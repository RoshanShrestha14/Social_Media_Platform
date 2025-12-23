if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("../routes/auth.Routes");
const userModel = require("../models/userModels");
const userRoutes = require("../routes/user.Routes");
const cookieParser = require("cookie-parser");
const postRoutes = require("../routes/postsRoutes")

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
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts",postRoutes)

app.get("/destroy", async (req, res) => {
  try {
    await userModel.deleteMany({});
    res.status(200).json({
      message: "Succesfully deleted data ",
    });
  } catch (err) {
    console.log("error in destorying", err);
  }
});

app.get("/", (req, res) => {
  res.json("hi i am root");
});
module.exports = app;
