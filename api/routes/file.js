module.exports = (app) => {
    let file = require('../controllers/fileController');

    app.route('/file')
        .get(file.getFile)
        .post(file.createFile)
        .delete(file.deleteFile);
};