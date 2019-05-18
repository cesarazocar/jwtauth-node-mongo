const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');


const config = require('./config');
const User = require('./app/models/user');

const apiRoutes = require('./api');

//settings

const port = process.env.PORT || 3000;


mongoose.connect(config.database, {
    useNewUrlParser: true
});

mongoose.Promise = global.Promise;

//crea variable secreta para autenticacion con jwt
app.set('superSecret', config.secret);


//middlewares

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.send('Hello, the api is at localhost:3000')
});

app.get('/setup', (req, res) => {


    //este usuario debería ser traido desde la BD
    const testUser = new User({
        name: 'Cesar',
        password: 'password',
        admin: true
    });


    testUser.save((err) => {
        if (err) throw err;
        console.log('User saved successfully');
        res.json({
            success: true
        });
    })
});




app.use('/api', apiRoutes); //rutas /api/

app.listen(port, () => {
    console.log(`server on port ${port}`);
});