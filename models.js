const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const app = express();
app.use(morgan('dev'));
// app.use(sequelize);

const db = new Sequelize('postgres://localhost:5432/plantr')
module.exports = [db]
