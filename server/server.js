const path = require('path');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

const PORT = process.env.PORT || 3030

corsConfig ={
  origin: 'https://sorter.vercel.app',
  optionsSuccessStatus: 200
}

app.use(cors(corsConfig))
dotenv.config()

const visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19', iam_apikey: process.env.API_KEY
});


app.get('/api/:l', (req, res) => {
  let url = `https://firebasestorage.googleapis.com/v0/b/sorterapp1.appspot.com/o/images%${req.params.l + "?alt=" + req.query.alt + "&token" + req.query.token}`
  
  var classifier_ids = ["DefaultCustomModel_236601643"];

  var params = {
    url:  url,
    classifier_ids: classifier_ids,
    treshold: 0.1
  };

  visualRecognition.classify(params, function (err, response) {
    if (err) {
      
    } else {
      res.send(JSON.stringify(response, null, 2))
      
    }
  });
})

app.listen(PORT)

