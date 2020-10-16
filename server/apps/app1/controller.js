// Require models to get access to constructors to set up create requests
const models = require('./models');


// Dummy Function
exports.dummy = (req, res) =>
{
    req.app.db.collection('dummy_table').findOne(
            {"_id": req.body.id},
            { projection: { _id: 1, title: 1, description: 1 } },
        function(err, result){
        if (err) throw err;
        res.jsonp(result);
        });
}
