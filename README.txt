(sqlite3) database creation query:

CREATE TABLE books (
id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
author varchar(25) not null, 
title varchar(40) not null unique, 
genre varchar(20) not null, 
price float not null
);

Run using:
npm insatll
npm start

Open browser to localhost:3000
