'use strict'
const cors = require('cors');
const authRoutes = require('./auth/auth.routes');
const express = require('express');
const properties = require('./config/properties');
const DB = require('./config/db');
// init DB
DB();

const app = express();
const router = express.Router();

const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

app.use(cors()); // "controlo" quienes pueden ingresar a mi server.. aca no se lo niego a nadie

app.use('/api', router);
authRoutes(router);
router.get('/', (req, res) => {
    res.send('EL BACKEND ESTÁ CORRIENDO :-)');
});
app.use(router);
app.listen(properties.PORT, () => console.log(`Server running on port ${properties.PORT}`));