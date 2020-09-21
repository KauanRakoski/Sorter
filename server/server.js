const path = require('path');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

app.use(cors())
dotenv.config()

const visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19', iam_apikey: process.env.API_KEY
});


app.get('/api/:l', (req, res) => {
  let url = `https://firebasestorage.googleapis.com/v0/b/sorterapp1.appspot.com/o/images%${req.params.l + "?alt=" + req.query.alt + "&token" + req.query.token}`
  

  var params = {
    url:  url,
  };

  visualRecognition.classify(params, function (err, response) {
    if (err) {
      res.send("ohm, no");
      console.error(err)
    } else {
      res.send(JSON.stringify(response, null, 2))
      console.log("fone")
    }
  });
})

app.listen(3030, console.log('on'))

