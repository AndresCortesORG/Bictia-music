const mongoose = require('mongoose');
const dbURL = require('./properties').DB;

module.exports = () => {
  mongoose.connect(dbURL, { useNewUrlParser: true })
    .then(() => console.log(`Mongo conectado en ${dbURL}`))
    .catch(err => console.log(`error desde db.js ${err}`))

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(`Mongo esta morido`);
      process.exit(0)
    });
  });
}