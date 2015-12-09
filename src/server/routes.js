var router = require('express').Router();
var four0four = require('./utils/404')();
var data = require('./sample-data.json');

router.get('/data', getAll);
router.get('/data/:id', getOne);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////

for (var i = 0, len = data.length; i < len; i++) {
    data[i].id = i + 1;
}

function getAll(req, res, next) {
    res.status(200).send(data);
}

function getOne(req, res, next) {
    var id = +req.params.id;
    var record = data.filter(function(d) {
        return d.id === id;
    })[0];

    if (record) {
        res.status(200).send(record);
    } else {
        four0four.send404(req, res, 'Record ' + id + ' not found');
    }
}
