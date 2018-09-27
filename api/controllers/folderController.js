let AWS = require('aws-sdk'),
    S3 = new AWS.S3();

let myBucket = 'mediamanager-nodetest';

const listFolder = (req, res) => {
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
        if (err) {
            res.status(400);
            res.send(err)
        };

        res.json(data);
    });
};

const createFolder = (req, res) => {
    let error;
    if (!req.body.folderName) {
        res.status(400).send({error: 'The folderName parameter is missing'});
        return;
    }
    let folderName = req.body.folderName.trim();

    if (!folderName) {
        res.status(400).send({error: 'Folder names must contain at least one non-space character.'});
        return;
    }
    if (folderName.indexOf('/') !== -1) {
        res.status(400).send({error: 'Folder names cannot contain slashes.'});
        return;
    }

    let folderKeyName = encodeURIComponent(folderName) + '/';

    let params = {
        Bucket: myBucket,
        Key: folderKeyName
    }
    S3.headObject(params, (err, data) => {
        if (!err) error = 'Folder already exists.';
        if (err && err.code !== 'NotFound') error ='There was an error creating your folder: ' + err.message;
        if (error) {
            res.status(400).send({error})
            return;
        };
        S3.putObject(params, (err, data) => {
            if (err) {
                res.status(400);
                res.json({ error: 'There was an error creating your folder: ' + err.message});
            }
            res.json(data);
        });
    });
};

const deleteFolder = (req, res) => {
    let error;
    if (!req.body.folderName) {
        res.status(400).send({error: 'The folderName parameter is missing'});
        return;
    }
    let folderName = req.body.folderName.trim();

    if (!folderName) {
        res.status(400).send({error: 'Folder names must contain at least one non-space character.'});
        return;
    };
    if (folderName.indexOf('/') !== -1) {
        res.status(400).send({error: 'Folder names cannot contain slashes.'});
        return;
    }

    folderName = encodeURIComponent(folderName) + '/';

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
    });
};

module.exports = {
    listFolder,
    createFolder,
    deleteFolder
};