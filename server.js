let express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  AWS = require('aws-sdk'),
  S3 = new AWS.S3();

// I nomi dei bucket devono essere univoci per tutti gli utenti S3

var myBucket = 'mediamanager-nodetest';

app.listen(port);

app.get('/get', (req, res) => {
    let startAfter = req.query.after;
    let params = {
        Bucket: myBucket,
        EncodingType: 'url'
    };

    if (startAfter) params.StartAfter = startAfter;

    S3.listObjectsV2(params, (err, data) => {
        if (err) res.send(err);
        res.json(data);
    });
});

console.log('server started on: ' + port);