const express = require("express");
const postController = require("../controllers/post.controller");

const postRouter = express.Router();


postRouter.get("/upload",postController.uploadPhoto);




module.exports = postRouter;