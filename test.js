/**
 * Created by SOFTMAN on 22-04-2017.
 */
var express  = require("express");
var path = require('path')
var bodyParser = require('body-parser');
var moment = require('moment');


var app = express();
app.use(bodyParser.urlencoded({
    extended : false
}));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/:id', function(req, res){
    var dateObj;
    var id = req.params.id;

    var date = moment(id).format("D MMMM YYYY");
    var unix = moment(id).unix();
    if(isNaN(id) ===false) {
        //id is a number string





    }
    if(typeof (date)) {

        dateObj = {
            unix : unix,
            natural : date
        }

    } else {
        dateObj = {
            unix : null,
            natural : null
        }
    }

    console.log("unix :"+unix+"\ndate: "+date);
    res.send(dateObj);
}).listen(8080);