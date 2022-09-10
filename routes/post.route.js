const express = require("express");
const postController = require("../controllers/post.controller");
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

var s3 = new aws.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_ACCESS_SECRET,
    apiVersion: process.env.AWS_API_VERSION,
    region: process.env.AWS_REGION,
    signatureVersion: process.env.AWS_SIGNATURE_VERSION
  })

const postRouter = express.Router();

const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.AWS_BUCKET_NAME,
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, `${req.params.type}/${Date.now().toString()}`)
      }
    })
  })


postRouter.get("/upload",postController.uploadPhoto);

postRouter.post('/uploadPhoto/:type', upload.single('file'), function(req, res, next) {
    res.status(200).json({
      "result":`${process.env.CDN}/${req.file.key}`
    })
  })

module.exports = postRouter;