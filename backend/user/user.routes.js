const Users = require('./user.controller');
const upload = require('./../config/multer');

module.exports = (router) => {
    router.post('/update-user', upload.single('avatar'), Users.updateUser);
    router.post('/update-password', Users.updatePasswordUser);
};
