const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')
require('dotenv').config()

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// uploads a file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream("./logo.png")
  
  console.log(fileStream.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: 'products/logo.png',
    ContentType: 'image/png',
    //ACL: 'public-read',
    //Expires: 60, 
  }

  return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile


// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
    Expires: 86400
  }
  return s3.getSignedUrl('getObject', downloadParams)
}
exports.getFileStream = getFileStream