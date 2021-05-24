const User = require('./auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'biensecreta123';

exports.createUser = (req, res, next) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password) //Acá estamos encriptando la contraseña
    }

    User.create(newUser, (err, user) => {
        if (err && err.code === 11000) return res.status(409).send('Este Email ya esta registrado!!');

        if (err) return res.status(500).send('SERVER ERROR!');
        const expiresIn = (60 * 60 * 24);
        const accessToken = jwt.sign({ id: user.id },
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
        res.send({ dataUser });
    });
}

exports.loginUser = (req, res, next) => { // userData es la info del user que viene del Frontend y user tiene la info del user de la BD
    const userData = {
        email: req.body.email,
        password: req.body.password
    }
    User.findOne({ email: userData.email }, (err, user) => {
        if (err) return res.status(500).send('SERVER ERROR!!');
        if (!user) {
            // email not valid
            res.status(409).send({ message: 'User and/or pass is/are not valid' });
        } else {
            const resultPassword = bcrypt.compareSync(userData.password, user.password); // Aca comparamos las contraseñas, la que viene con la real.
            if (resultPassword) {
                const expiresIn = (60 * 60 * 24);
                const accesToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });
                const dataUser = {
                    name: user.name,
                    email: user.email,
                    accessToken: accesToken,
                    expiresIn: expiresIn
                }
                res.send({ dataUser });
            } else {
                // passowrd not valid
                res.status(409).send({ message: 'User and/or pass is/are not valid' });
            }
        }
    });

}