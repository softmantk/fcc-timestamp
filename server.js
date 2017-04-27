var express  = require("express");
var path = require('path')
var mongodb = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var logger = require('morgan');
var moment = require('moment');
var date = moment().format("DD MM YYYY - hh:mm:ss a");
var page = 1;
const GoogleImages = require('google-images')
var url = "mongodb://admin1:admin1@ds117251.mlab.com:17251/softmandb"
var app = express();
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({
    extended : false
}));
app.use(express.static(path.join(__dirname, 'public')));



console.log("server running ....")

app.get('/search/:id', function (req, res) {

    const client = new GoogleImages('010621396975509520882:pjbwbgmb6ao', 'AIzaSyARgMDzJDagnnuJ-AVWd4CILdGA_gy-d6g' );
    var imageresults = [];
    var search = req.params.id;
    if(req.query.offset) {
        page  = parseInt(req.query.offset);
    }

    client.search(search, {
        page : page
    }).then(function (images) {
        //console.log("results: ", images);
        imageresults = images;
        res.send(imageresults)
    });

    mongodb.connect(url, function (err, db) {
        if(err)
            throw err
        var collection = db.collection('searchHistory');
        collection.insertOne({
            query: search,
            time : date
        });

    });

});

app.get('/history',function (req, res) {
    mongodb.connect(url, function (err, db) {
        if(err)
            throw err
        var collection = db.collection('searchHistory');
        collection.find({}).sort({time : -1}).toArray(function (err, data) {
            if(err)
                throw err
            console.log(data)
            res.send(data)
        })

    })

});

app.get('/:id', function(req, res){


    var dateObj;
    var id = req.params.id;
    if(isNaN(id) === false) {
        //id is a number string
        var unix =Math.floor(  (new Date(parseInt(id))).getTime() / 1000  ) ;
        var parsed =new Date(parseInt(id)) ;
        var date = (parsed).toString().replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*!/,'$2-$1-$3');

        console.log("success!!!: "+unix);

    } else  {
        var unix =Math.floor(  (new Date(id)).getTime() / 1000  ) ;

        var parsed =new Date(id) ;
        var date = (parsed).toString().replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/,'$2-$1-$3');

    }



    if(isNaN(unix) ===false) {

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

   // var TimeNoramal = parsed.toISOString()
    console.log("****************\nunix :"+unix+"\ndate: "+date);
    res.send(dateObj);
});
// For 404 page not found

app.use(function (req, res) {
    var err = new Error('Not Found');
    err.status = 404;
    res.end("page not found");
});

app.listen(process.env.PORT||8080 );
