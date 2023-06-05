// CREATE TABLE books (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, author varchar(25) not null, title varchar(40) not null unique, genre varchar(20) not null, price float not null);

const books = require('./books.js');
books.init();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static('public'));

const routes = require('./routes.js');
routes.init(app);

app.listen(3000);
