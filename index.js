

import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 3000;
/**
 * Middlewares
 */
dotenv.config();
app.use(morgan('dev'));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/**
 * Set up mongodb connection
 */
connect(process.env.MONGODB_URI);
const db = connection;
db.once("open", () => {
  console.log("Successfully connected to mongodb!");
});


const server = app.listen(PORT, () => {
  console.log("application is running");
});

