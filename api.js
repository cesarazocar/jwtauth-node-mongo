const express = require('express');
const apiRoutes = express.Router();
const jwt = require('jsonwebtoken');

const User = require('./app/models/user');

//para generar el token
apiRoutes.post('/authenticate', (req, res) => {
    User.findOne({ //consulta por un usuario en la bd y lo guarda en name
        name: req.body.name
    }, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.json({ success: true, message: 'autenticacion fallida. usuario no encontrado' });
        } else if (user) {
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'autenticacion fallida, contraseña erronea' });
            } else {
                //generando un token gracias al modulo sign(firma) de jwt le pasa el parametro del user que estara en el token 
                //y la llave privada que genero anteriormente (palabrasecreta) (revisar estructura de jwt.io header.payload.verifysignature)
                const token = jwt.sign({ user }, req.app.get('superSecret'));
                res.json({
                    success: true,
                    message: 'disfruta tu token',
                    token //es lo mismo que escribir token:token
                })
            }
        }

    })
});











//middleware para autenticar y validar si pasa o no
apiRoutes.use((req, res, next) => {
    //se puede recibir de 3 formas: desde un json, de una query del navegador (url:port/api/users?token=2312) o por las cabeceras  
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, req.app.get('superSecret'), (err, decoded) => { //verifica y devuelve err o datos decodificados
            if (err) {
                return res.json({
                    success: false,
                    message: 'autenticacion fallida'
                })
            } else {
                req.decoded = decoded; //tomar dato decodificado y almacenarlo en el objeto de la peticion
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'no existe el token'
        })
    }
})






apiRoutes.get('/', (req, res) => {

    res.json({
        message: 'Welcome to my API'
    })
});

apiRoutes.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if (err) throw err;
        res.json({ users })
    });
});

module.exports = apiRoutes;