let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    AWS = require('aws-sdk'),
    S3 = new AWS.S3();

var myBucket = 'mediamanager-nodetest';

app.listen(port);

app.get('/folder', (req, res) => {
    let params = {
        Bucket: myBucket,
        Delimiter: '/'
    };

    // Set a prefix if is passed in the GET request
    let prefix = req.query.prefix;
    if (prefix) params.Prefix = prefix;

    // Set a continuation token if is passed into the request
    let continuation = req.query.continuation;
    if (prefix) params.ContinuationToken = continuation;

    S3.listObjectsV2(params, (err, data) => {
        if (err) res.send(err);
        res.json(data);
    });
});

console.log('server started on: ' + port);