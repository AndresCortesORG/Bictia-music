const User = require('./../auth/auth.dao');
const bcrypt = require('bcryptjs');

const updateUser = async (req, res) => {
    const file = req.file;

    const userData = {
        name: req.body.name,
        email: req.body.email,
        url_avatar: `uploads/${file.filename}`
    };

    if (!req.body.id) return res.status(409).json({message: 'Id obligatorio'});

     User.findByIdAndUpdate(req.body.id, userData, (err, user) => {
         if(err) {
             return res.json({message: 'Error con el servidor'});
         }

         if(!user) {
             return res.json({message: 'Error al actualizar el usuario'});
         }

         return res.json({message: 'Usuario actualizado correctamente.', user});
     });
};

const updatePasswordUser = async (req, res) => {

    const userData = {
        id: req.body.id,
        password: bcrypt.hashSync(req.body.password)
    };

    if (!req.body.id) return res.status(409).json({message: 'Id obligatorio'});

    User.findByIdAndUpdate(req.body.id, userData, (err, user) => {
        if(err) {
            return res.json({message: 'Error con el servidor'});
        }

        if(!user) {
            return res.json({message: 'Error al actualizar el usuario'});
        }

        return res.json({message: 'Contraseña actualizada correctamente.'});
    });
};


module.exports = {
    updateUser,
    updatePasswordUser
};
