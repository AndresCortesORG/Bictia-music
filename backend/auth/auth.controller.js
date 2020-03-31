const User = require('./auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'oscargay';

exports.createUser = (req, res) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    };

    User.create(newUser, (err, user) => {
        if (err && err.code === 11000) return res.status(409).json({message: 'El correo ya existe'});
        if (err) return res.status(500).json({message: 'Servidor murio auth controller'});
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({id: user.id},
            SECRET_KEY, {
                expiresIn: expiresIn
            });
        const dataUser = {
            name: user.name,
            email: user.email,
            accessToken: accessToken,
            expiresIn: expiresIn
        }
        // response
        res.json({dataUser});
    });
};

exports.loginUser = (req, res) => {
    const userData = {
        email: req.body.email,
        password: req.body.password
    };

    User.findOne({email: userData.email}, (err, user) => {
        if (err) return res.status(500).json({message: 'Servidor murio en auth controller'});

        if (!user) {
            res.status(409).json({message: 'No existe ese correo en la db'});
        } else {
            const resultPassword = bcrypt.compareSync(userData.password, user.password);
            if (resultPassword) {
                const expiresIn = 24 * 60 * 60;
                const accessToken = jwt.sign({id: user.id}, SECRET_KEY, {expiresIn: expiresIn});

                const dataUser = {
                    name: user.name,
                    email: user.email,
                    accessToken: accessToken,
                    expiresIn: expiresIn
                };

                res.json({dataUser});
            } else {
                // password wrong
                res.status(409).json({message: 'Contraseña mala'});
            }
        }
    });
};











