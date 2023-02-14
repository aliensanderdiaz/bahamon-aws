const { uploadFile, getFileStream } = require('./s3.js');

// uploadFile()
const url = getFileStream('ABC123.jpg')
console.log({ url })