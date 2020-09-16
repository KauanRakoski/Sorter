const path = require('path');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

dotenv.config()

var visualRecognition = new VisualRecognitionV3 ({
  version: '2018-03-19', iam_apikey: process.env.API_KEY
});

var url= 'https://4.imimg.com/data4/BU/KX/MY-2890611/4-500x500.jpg';

var params = {
  url: url,
};

visualRecognition.classify (params, function (err, response) {
  if (err) {
    console.log(err);
  } else {
    console.log(JSON.stringify(response, null, 2))
  }
});
