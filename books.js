class Book {
    constructor(id, author, title, genre, price) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.genre = genre;
        this.price = price;
    }
}

module.exports = {
    init: function() {
        const sqlite3 = require('sqlite3').verbose();
        this.db = new sqlite3.Database('books.db');
    },
    addBook: function (book) {
        return new Promise ((resolve, reject) => {
            const query = `insert into books (author, title, genre, price) values ("${book.author}", "${book.title}", "${book.genre}", "${book.price}")`;
            this.db.run(query, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('OK');
                }
            });
        });
    },
    getBookByKeyword: async function (keyword) {

        const query = `select * from books where author like "%${keyword}%" or title like "%${keyword}%" or genre like "%${keyword}%"`;
        const rows = await this.runQuery(query);
        bookList = [];
        for (row of rows) {
            book = new Book(row.id, row.author, row.title, row.genre, row.price);
            bookList.push(book);
        }

        return bookList;
    },
    runQuery: function (query) {
        return new Promise((resolve, reject) => {
            this.db.all(query, (err, rows) => {
                if (err) {
                    console.log('Error accessing db');
                    reject(err);
                }
                resolve(rows);
            });
        });
    }
}
