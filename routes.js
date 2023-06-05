const books = require('./books.js');
books.init();

module.exports = {
    init: function(app) {
        app.get('/books/:keyword', async (req, res) => {
            try {
                const keyword = req.params.keyword;
                bookList = await books.getBookByKeyword(keyword);
                res.json(bookList);
            } catch (err) {
                console.error(err);
                res.append('status', '500');
                res.send(err);
            }
        });

        app.post('/books', async (req, res) => {
            const book = req.body;
            try {
                const result = await books.addBook(book);
                // res.json(req.body);
                res.send({result: "OK"});
            } catch (err) {
                // res.append('status', '500');
                // res.send(err);
                console.log(err);
                if (err.code == 'SQLITE_CONSTRAINT') {
                    res.send({result: "Existing book"});
                } else {
                    res.send({result: "Error"});
                }
            }
        });
    }
};