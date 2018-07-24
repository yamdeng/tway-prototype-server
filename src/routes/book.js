const express = require('express');
const router = express.Router();
const dbService = require('../services/db');
const errorRouteHandler = require('../errors/routeHandler');

// book 등록
router.post('/', function(req, res, next) {
    const newBook = req.body;
    dbService
        .insert('book', newBook)
        .then(() => {
            res.send({ isbn: newBook.isbn });
        })
        .catch(errorRouteHandler(next));
});

// book 수정
router.put('/:isbn', function(req, res, next) {
    const updateBook = req.body;
    dbService
        .update('book', updateBook, 'isbn', req.params.isbn)
        .then(() => {
            res.send({ isbn: req.params.isbn });
        })
        .catch(errorRouteHandler(next));
});

// book 삭제
router.delete('/:isbn', function(req, res, next) {
    dbService
        .delete('book', 'isbn', req.params.isbn)
        .then(() => {
            res.send({ isbn: req.params.isbn });
        })
        .catch(errorRouteHandler(next));
});

// book 한건 얻어오기
router.get('/:isbn', function(req, res, next) {
    dbService
        .selectOne('book', 'isbn', req.params.isbn)
        .then(book => {
            res.send(book);
        })
        .catch(errorRouteHandler(next));
});

// book 목록(전체)
router.get('/', function(req, res, next) {
    dbService
        .select('book')
        .then(list => {
            res.send(list);
        })
        .catch(errorRouteHandler(next));
});

module.exports = router;
