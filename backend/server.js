const cors = require('cors');
const authRoutes = require('./auth/auth.routes');
const userRoutes = require('./user/user.routes');
const express = require('express');
const propierties = require('./config/properties');
const DB = require('./config/db');
const bodyParser = require('body-parser');

// init DB
DB();

const app = express();
const router = express.Router();

const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });


app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

app.use( (req, res, next) => {

  res.header('Access-Control-Allow-Origin', '*');
  // todos los metadatos - cookies
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  // todos los métodos http - métodos de petición
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  // Confirmación estricta de los métodos a utilizar
  res.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS');

  next();

} )



app.use('/api', router);

authRoutes(router);
userRoutes(router);

router.get('/', (req, res) => {
  res.send('Hola mundo desde /');
});
app.use(router);
app.listen(propierties.PORT, () => console.log(`El server prendio en el puerto ${propierties.PORT}`));
