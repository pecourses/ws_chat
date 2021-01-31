const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const mode = process.env.NODE_ENV || 'development';
const config = require('./../configs/db')[mode];
const basename = path.basename(__filename);

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const connectionCallback = err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
};
mongoose.connect(`mongodb://${config.host}:${config.port}/${config.database}`, connectionOptions, connectionCallback);

const fileRegExp = /^[^.].*?\.js$/;

const db = {};

fs.readdirSync(__dirname)
  .filter(file => fileRegExp.test(file) && file !== basename)
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    db[model.modelName] = model;
  });

db.mongoose = mongoose;

module.exports = db;
