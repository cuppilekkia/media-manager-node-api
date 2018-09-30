let AWS = require('aws-sdk'),
    S3 = new AWS.S3();

let myBucket = 'mediamanager-nodetest';

const getFile = (req, res) => {
    let error;
    let params = {
        Bucket: myBucket,
        Key: req.query.key
    };

    S3.headObject(params, (err, data) => {
        if (err) {
            if (err.code !== 'NotFound') {
                error = 'There was an error retrieving your file: ' + err.message;
            } else {
                error = 'File not found.';
            }
            res.status(404).send({error});
            return;
        };
        
        res.json(data);
    });
};

const createFile = (req, res) => {
    let encodedImage =JSON.parse(event.body).file;
    let decodedImage = Buffer.from(encodedImage, 'base64');
    let filePath = event.queryStringParameters.key;

    let params = {
        "Bucket": myBucket,
        "Body": decodedImage,
        "Key": filePath  
    };

    /* S3.upload({
      Key: photoKey,
      Body: file
    }, function(err, data) {
      if (err) {
        return alert('There was an error uploading your photo: ', err.message);
      }
    }); */
};

const deleteFile = (req, res) => {
    /* 
    S3.listObjects({
        Bucket: myBucket,
        Prefix: folderName
    }, (err, data) => {
        if (err) {
            res.status(400).send({error: 'There was an error deleting your album: ' + err.message});
            return;
        }
        let objects = data.Contents.map((object) => {
            return {Key: object.Key};
        });
        S3.deleteObjects({
            Bucket: myBucket,
            Delete: {Objects: objects, Quiet: true}
        }, (err, data) => {
            if (err) {
                res.status(400).send({error: 'There was an error deleting your album: ' + err.message});
                return;
            }
            res.json({message:'Successfully deleted album.'});
        });
    }); */
};

module.exports = {
    getFile,
    createFile,
    deleteFile
};