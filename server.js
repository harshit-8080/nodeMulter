const express = require("express");
const app = express();
const dotenv = require("dotenv");
require('dotenv').config(); 
const postRouter = require("./routes/post.route");

app.use(postRouter);

app.use(express.json());
// app.get("/", (req, res)=>{
//     res.status(200).json({
//         "msg":"data"
//     })
// })


app.listen(process.env.PORT, ()=>{
    console.log(`server started at ${process.env.PORT}`);
})