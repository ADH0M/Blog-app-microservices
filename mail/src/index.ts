import express from "express";
import dotenv from 'dotenv';
import { startSendOTPConsumer } from "./utilts/consumer.js";
dotenv.config();
const app = express();

startSendOTPConsumer();

app.listen(process.env.PORT , ()=>{
    console.log(`server is running on port ${process.env.PORT}`);
});