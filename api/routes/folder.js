module.exports = (app) => {
    let folder = require('../controllers/folderController');

    app.route('/folder')
        .get(folder.listFolder)
        .post(folder.createFolder)
        .delete(folder.deleteFolder);
};